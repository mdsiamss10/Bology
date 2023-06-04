import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsFillCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

function Comment({
  comment,
  postID,
}: {
  comment: {
    createdAt?: string | undefined;
    id: string;
    postId: string;
    comment: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  };
  postID?: string;
}) {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (commentID: string) =>
      await axios.post("/api/posts/deletePost", { postID, commentID }),
    {
      onSuccess: (data: any) => {
        toast.dismiss(comment.id);
        queryClient.invalidateQueries(["getComments"]);
        toast.success("Your thought is in heaven now!❤️");
      },
    }
  );
  const handleDeletePost = async (commentID: string) => {
    if (confirm("Are you sure you want to delete your comment?")) {
      toast.loading("Removing your thought...", { toastId: comment.id });
      mutate(commentID);
    }
  };
  return (
    <div className="mb-2 bg-white p-4 px-5 rounded-lg shadow-sm">
      <div>
        {/* First section */}
        <div className="flex gap-3 items-center">
          <Image
            src={comment?.user?.image ?? ""}
            alt="User's image"
            className="avatar w-12 rounded-full"
            width={1000}
            height={1000}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1>{comment?.user?.name}</h1>
              <BsFillCircleFill size={6} className="text-gray-500 mt-1" />
              <span className="text-gray-500 text-sm mt-[0.22rem]">
                {moment(comment?.createdAt).fromNow()}
              </span>
            </div>
            <h1 className="text-sm text-gray-400">{comment?.user?.email}</h1>
          </div>
        </div>
        {/* Second Section */}
        <div className="mt-3 ml-[3.78rem]">
          <h1>{comment?.comment}</h1>
        </div>
      </div>
      {/* If user is logged in show delete button */}
      {data?.user?.email == comment?.user?.email && (
        <div className="ml-[3.78rem] mt-3 w-fit flex items-center gap-3">
          <h1
            className="text-sm font-bold text-red-500 cursor-pointer select-none"
            onClick={() => {
              handleDeletePost(comment.id);
            }}
          >
            Delete
          </h1>
        </div>
      )}
    </div>
  );
}

export default Comment;
