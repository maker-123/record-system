import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

// import { useRouter } from "next/navigation";
// const router = useRouter();
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Correct way to access search params in a server function
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
    // Ensure data is provided
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
    };
    // Update the patient
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
