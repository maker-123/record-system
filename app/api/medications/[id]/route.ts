import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const medication = await prisma.medication.findUnique({
        where: { id: id as string },
        include: { patient: true }, // Include related patient details
      });

      if (!medication)
        return res.status(404).json({ error: "Medication not found" });

      return res.status(200).json(medication);
    }

    if (req.method === "PUT") {
      const { name, dosage, route, frequency, indication, prescribedBy } =
        req.body;

      const updatedMedication = await prisma.medication.update({
        where: { id: id as string },
        data: { name, dosage, route, frequency, indication, prescribedBy },
      });

      return res.status(200).json(updatedMedication);
    }

    if (req.method === "DELETE") {
      await prisma.medication.delete({ where: { id: id as string } });
      return res
        .status(200)
        .json({ message: "Medication deleted successfully" });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
