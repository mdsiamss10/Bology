"use client";

import { PostItemProps } from "@/type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { MdOutlineComment, MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function PostItem({
  title,
  id,
  createdAt,
  isInDashboard,
  isInCommentPage,
  user: { name, email, image },
  comments,
}: PostItemProps) {
  const { data } = useSession();
  const MySwal = withReactContent(Swal);
  const { mutate } = useMutation(
    async (id: string) => await axios.post("/api/posts/deletePost", { id }),
    {
      onSuccess: (data: any) => {
        MySwal.fire("Deleted!", "Your thought has been deleted.", "success");
      },
    }
  );
  const handleDeletePost = async (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };
  return (
    <div className="mb-2 bg-white p-4 px-5 rounded-lg shadow-sm flex justify-between items-center">
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
              <span className="text-gray-500 text-sm mt-[0.22rem]">
                {moment(createdAt).fromNow()}
              </span>
            </div>
            <h1 className="text-sm text-gray-400">{email}</h1>
          </div>
        </div>
        {/* Second Section */}
        <div className="mt-3 ml-[3.78rem]">
          <h1>{title}</h1>
        </div>
      </div>
      {/* If user is logged in show comment likes section Right Section */}
      {data != null && (
        <>
          <div className="flex flex-col gap-5">
            <div className="flex gap-1">
              {!isInCommentPage && (
                <Link href={`/post/${id}`}>
                  <MdOutlineComment
                    className="cursor-pointer"
                    color="green"
                    size={22}
                  />
                </Link>
              )}
              <span className="text-xs font-semibold text-gray-600">
                {comments.length}
              </span>
            </div>
            {isInDashboard ? (
              <MdOutlineDelete
                className="cursor-pointer"
                color="red"
                size={22}
                onClick={() => {
                  handleDeletePost(id);
                }}
              />
            ) : (
              <AiOutlineLike className="cursor-pointer" color="red" size={22} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PostItem;
