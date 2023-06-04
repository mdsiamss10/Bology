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
    const { postID, commentID } = req.body;

    try {
      await prisma.post.update({
        where: {
          id: postID,
        },
        data: {
          comments: {
            delete: {
              id: commentID,
            },
          },
        },
      });
      res.status(200).json({ message: "Post deleted successfully." });
    } catch (error: any) {
      res.status(403).json({
        message: "Error occur while deleting your post",
        error: error.message,
      });
    }
  }
}
