import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);

    // Don't allow unauthorized user
    if (!session)
      return res.status(401).json({ message: "Invalid Session Token" });

    // Allow session
    const { comment, id } = req.body;

    try {
      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user?.email! },
      });
      const result = await prisma.comment.create({
        // @ts-ignore
        data: {
          comment,
          userId: prismaUser?.id,
          postId: id,
        },
      });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(403).json({
        message: "Error occur while adding comment to a post",
        error: error.message,
      });
    }
  }
}
