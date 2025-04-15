import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import moment from "moment";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    console.log("Deleting patient...");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid patient ID format" },
        { status: 400 }
      );
    }

    const existingPatient = await prisma.patient.findUnique({ where: { id } });
    if (!existingPatient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    await prisma.medication.deleteMany({ where: { patientId: id } });

    await prisma.patient.delete({ where: { id } });

    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Patient ID is required" },
        { status: 400 }
      );
    }

    const data = await req.json();
    delete data.id;

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No update data provided" },
        { status: 400 }
      );
    }

    const formattedData = {
      ...data,
      dob: moment(data.dob, "YYYY-MM-DD").toDate(),
      phone: parseInt(data.phone),
      zip: parseInt(data.zip),
      age: parseInt(data.age),
      weight: parseFloat(data.weight),
      height: parseFloat(data.height),
      medications: data.medications
        ? {
            set: data.medications.map((med: { id: string }) => ({
              id: med.id,
            })),
          }
        : undefined,
    };

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: formattedData,
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { message: "Error updating patient" },
      { status: 500 }
    );
  }
}
