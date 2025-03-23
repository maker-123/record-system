import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, ...updateData } = await req.json();

    const updatedMedication = await prisma.medication.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedMedication);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
