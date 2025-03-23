import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  // Ensure `id` is not null
  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  try {
    const medication = await prisma.medication.findUnique({
      where: { id },
      include: { patient: true },
    });

    if (!medication) {
      return NextResponse.json(
        { error: "Medication not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(medication);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
