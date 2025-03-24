import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;

//   try {
//     const medication = await prisma.medication.findUnique({
//       where: { id },
//       include: { patient: true },
//     });

//     if (!medication) {
//       return NextResponse.json(
//         { error: "Medication not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(medication, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching medication:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch medication" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Extract ID from query params

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

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;

//   try {
//     await prisma.medication.delete({ where: { id } });

//     return NextResponse.json(
//       { message: "Medication deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting medication:", error);
//     return NextResponse.json(
//       { error: "Failed to delete medication" },
//       { status: 500 }
//     );
//   }
// }
