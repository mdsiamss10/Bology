"use client";

import { PostItemProps } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { BsFillCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

function PostItem({
  title,
  id,
  createdAt,
  isInDashboard,
  isInCommentPage,
  user: { name, email, image } = {},
  comments,
}: PostItemProps) {
  console.log(title);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) => await axios.post("/api/posts/deletePost", { id }),
    {
      onSuccess: (data: any) => {
        toast.dismiss(id);
        queryClient.invalidateQueries(["authPosts"]);
        toast.success("Your thought is in heaven now!❤️");
      },
    }
  );
  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      toast.loading("Removing your thought...", { toastId: id });
      mutate(id);
    }
  };

  return (
    <div className="mb-2 bg-white p-4 px-5 rounded-lg shadow-lg shadow-stone-300/30 transition-all duration-1000">
      <div>
        {/* First section */}
        <div className="flex gap-3 items-center">
          <Image
            src={image ?? ""}
            alt="User's image"
            className="avatar w-12 rounded-full"
            width={1000}
            height={1000}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1>{name}</h1>
              <BsFillCircleFill size={6} className="text-gray-500 mt-1" />
              <span className="text-gray-500 text-sm mt-[0.212rem]">
                {moment(createdAt).fromNow()}
              </span>
            </div>
            <h1 className="text-sm text-gray-400">{email}</h1>
          </div>
        </div>
        {/* Second Section */}
        <div className="mt-4 whitespace-pre-wrap break-all">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: title!,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* If user is logged in show comment likes section Right Section */}
      <div className="mt-4 w-fit flex items-center gap-3 ml-auto">
        {!isInCommentPage && (
          <Link
            href={`/post/${id}`}
            className="text-s font- text-green-500 cursor-pointer select-none"
          >
            {comments?.length} - comment{comments!.length > 1 && "s"}
          </Link>
        )}
        {isInDashboard && (
          <h1
            className="text-sm font-bold text-red-500 cursor-pointer select-none"
            onClick={() => {
              handleDeletePost(id!);
            }}
          >
            Delete
          </h1>
        )}
      </div>
    </div>
  );
}

export default PostItem;
