import { NextApiRequest, NextApiResponse } from "next";
import { DecodedToken } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (
  req: NextApiRequest,
  res: NextApiResponse
): DecodedToken | null => {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded === "object" && "id" in decoded && "email" in decoded) {
      return decoded as DecodedToken;
    } else {
      res.status(401).json({ message: "Invalid Token Format" });
      return null;
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid Token", error });
    return null;
  }
};
