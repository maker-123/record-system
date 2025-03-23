import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { patientSchema } from "@/lib/validation";

// Create Patient
export async function createPatient(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = patientSchema.parse(body);

    const patient = await prisma.patient.create({
      data: validatedData,
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create patient." },
      { status: 400 }
    );
  }
}
