import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import moment from "moment";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const formattedData = {
      ...data,
      dob: moment(data.dob, "YYYY-MM-DD").toDate(),
      phone: parseInt(data.phone),
      zip: parseInt(data.zip),
      age: parseInt(data.age),
      weight: parseFloat(data.weight),
      height: parseFloat(data.height),
      status: "pending",
    };

    const patient = await prisma.patient.create({ data: formattedData });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
