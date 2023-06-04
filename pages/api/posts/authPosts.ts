import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Allow session
    const session = await getServerSession(req, res, authOptions);
    try {
      const data = await prisma.post.findMany({
        where: { user: { email: session?.user?.email } },
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(403).json({
        message: "Error occur while getting auth posts",
        error: error.message,
      });
    }
  }
}
