import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Allow session
    try {
      const data = await prisma.post.findMany({
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(403).json({
        message: "Error occur while getting posts",
        error: error.message,
      });
    }
  }
}
