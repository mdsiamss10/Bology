"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

function AddPost({ session }: { session: Session }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const maxTitleLength = 280;
  // Define title state
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  // defining post submit mutations
  const { mutate } = useMutation(
    async (title: string) => {
      await axios.post("/api/posts/addPost", { title });
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
        queryClient.invalidateQueries(["getPosts"]);
        toast.success("Your thought just got it's life.😀");
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length !== 0) {
      setIsDisabled(true);
      toast.loading("Giving your thoughts a new life.🛠️", {
        toastId: "creating",
      }); // Show "Creating" toast
      mutate(title);
    } else {
      toast.info("Please enter a title.");
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 mb-4 rounded-md shadow-2xl shadow-stone-200/90">
      <form onSubmit={handleSubmit}>
        {/* text area div */}
        <div className="w-full mb-1">
          <textarea
            placeholder="What's on your mind?"
            className="textarea textarea-bordered textarea-md h-24 w-full resize-none bg-[#f8f8f8]"
            maxLength={maxTitleLength}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </div>
        <div className="w-full flex flex-col justify-between items-center sm:flex-row">
          {/* Title length */}
          <span
            className={`text-sm font-medium mb-2 sm:mb-0 ${
              title.length == maxTitleLength ? `text-red-500` : `text-green-500`
            }`}
          >
            {title.length}/{maxTitleLength}
          </span>
          {/* add post button */}
          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary rounded-md float-right w-full text-white sm:w-auto"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
