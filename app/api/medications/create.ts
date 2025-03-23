import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      name,
      dosage,
      frequency,
      route,
      indication,
      prescribedBy,
      patientId,
    } = await request.json();

    const newMedication = await prisma.medication.create({
      data: {
        name,
        dosage,
        frequency,
        route,
        indication,
        prescribedBy,
        patientId,
      },
    });

    return NextResponse.json(newMedication, { status: 201 });
  } catch (error) {
    console.error("Error creating medication:", error);
    return NextResponse.json(
      { error: "Failed to create medication" },
      { status: 500 }
    );
  }
}
