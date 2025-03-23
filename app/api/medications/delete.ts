import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.medication.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Medication deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
