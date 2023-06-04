"use client";

import AddComment from "@/components/AddComment";
import PostItem from "@/components/PostItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CommentPage({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading } = useQuery(
    ["getComments"],
    async () => await axios.get("/api/posts/" + id)
  );
  return (
    <>
      <div className="px-3">
        <PostItem {...data?.data} isInCommentPage={true} />
        {isLoading ? (
          <span className="loading loading-dots mt-3 text-center" />
        ) : (
          <AddComment id={id} {...data?.data} />
        )}
      </div>
    </>
  );
}

export default CommentPage;
