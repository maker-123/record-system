import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import moment from "moment";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        medications: true,
      },
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const formattedData = {
      ...data,
      dob: moment(data.dob, "YYYY-MM-DD").toDate(),
    };

    const patient = await prisma.patient.create({ data: formattedData });
    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
