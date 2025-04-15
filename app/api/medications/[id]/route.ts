import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Medication ID is required" },
        { status: 400 }
      );
    }
    const {
      name,
      dosage,
      route,
      frequency,
      indication,
      prescribedBy,
      preparation,
    } = await req.json();

    const updatedMedication = await prisma.medication.update({
      where: { id },
      data: {
        name,
        dosage,
        route,
        frequency,
        indication,
        prescribedBy,
        preparation,
      },
    });
    console.log(updatedMedication);
    return NextResponse.json(updatedMedication, { status: 200 });
  } catch (error) {
    console.error("Error updating medication:", error);
    return NextResponse.json(
      { error: "Failed to update medication" },
      { status: 500 }
    );
  }
}
