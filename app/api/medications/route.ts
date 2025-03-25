import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const medications = await prisma.medication.findMany({
      include: { patient: true },
    });
    return NextResponse.json(medications, { status: 200 });
  } catch (error) {
    console.error("Error fetching medications:", error);
    return NextResponse.json(
      { error: "Failed to fetch medications" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (
      !data.name ||
      !data.dosage ||
      !data.route ||
      !data.frequency ||
      !data.indication ||
      !data.prescribedBy ||
      !data.patientId
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create the medication entry
    const medication = await prisma.medication.create({
      data: {
        ...data,
      },
    });

    // Update patient's status to "medication set"
    await prisma.patient.update({
      where: { id: data.patientId },
      data: { status: "medication_set" },
    });

    return NextResponse.json(medication, { status: 201 });
  } catch (error) {
    console.error("Error creating medication:", error);
    return NextResponse.json(
      { error: "Failed to create medication" },
      { status: 500 }
    );
  }
}
