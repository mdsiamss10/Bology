"use client";

import { PostItemProps } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Comment from "./Comment";

function AddComment({ id, comments }: PostItemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const maxTitleLength = 120;
  // Define title state
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  // defining post submit mutations
  const { mutate } = useMutation(
    async (comment: string) => {
      await axios.post("/api/posts/addComment", { comment, id });
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          setIsDisabled(false);
        }
      },
      onSuccess: (data: any) => {
        toast.dismiss("creating"); // Close the "Creating" toast
        queryClient.invalidateQueries(["getComments"]);
        toast.success("Your thought just shared with someone.😀");
        setComment("");
        setIsDisabled(false);
      },
    }
  );

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim().length !== 0) {
      setIsDisabled(true);
      toast.loading("Giving your thought to someone.🛠️", {
        toastId: "creating",
      });
      mutate(comment);
    } else {
      toast.info("Please enter comment.");
    }
  };

  const { data } = useSession();

  return (
    <div className="flex flex-col bg-white p-4 rounded-md shadow-sm mb-3">
      {/* If user is logged in show add comment */}
      {data && (
        <form onSubmit={handleSubmit}>
          {/* text area div */}
          <div className="w-full mb-1">
            <textarea
              placeholder="What do you think about it?"
              className="textarea textarea-bordered textarea-md h-20 w-full resize-none bg-[#f8f8f8]"
              maxLength={maxTitleLength}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col justify-between items-center sm:flex-row">
            {/* Title length */}
            <span
              className={`text-sm font-medium mb-2 sm:mb-0 ${
                comment.length == maxTitleLength
                  ? `text-red-500`
                  : `text-green-500`
              }`}
            >
              {comment.length}/{maxTitleLength}
            </span>
            {/* add post button */}
            <button
              type="submit"
              disabled={isDisabled}
              className="btn btn-primary rounded-md float-right w-full mb-2 text-white sm:w-auto"
            >
              SUBMIT
            </button>
          </div>
        </form>
      )}
      {/* Comments Section */}
      {comments?.length !== 0 && (
        <div className="bg-[#f8f8f8] p-4 rounded-md">
          <h1 className="mb-2 font-semibold">Comments:</h1>
          {comments?.map((comment) => (
            <>
              <Comment key={comment.id} comment={comment} postID={id!} />
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddComment;
