import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DecodedToken } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const decoded: DecodedToken | null = verifyToken(req, res);
  if (!decoded) return;

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
}
