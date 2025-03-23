import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const medications = await prisma.medication.findMany({
      include: { patient: true }, // Include patient details in response
    });

    return NextResponse.json(medications);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
