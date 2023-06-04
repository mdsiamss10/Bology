import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // Allow session
    try {
      const data = await prisma.post.findUnique({
        // @ts-ignore
        where: { id: req.query.details },
        include: {
          user: true,
          comments: {
            orderBy: { createdAt: "desc" },
            include: {
              user: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(403).json({
        message: "Error occur while getting posts",
        error: error.message,
      });
      console.log(error);
    }
  }
}
