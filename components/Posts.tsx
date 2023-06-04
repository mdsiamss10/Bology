"use client";

import { PostItemProps } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostItem from "./PostItem";

function Posts() {
  const { data, isLoading, isError } = useQuery<PostItemProps[]>({
    queryFn: async () => await axios.get("/api/posts/getPosts"),
    queryKey: ["getPosts"],
  });
  if (isLoading) {
    return (
      <span className="loading loading-dots text-gray-700 mx-auto mt-10 text-center w-20" />
    );
  }
  if (isError) {
    return (
      <h1 className="text-2xl font-medium mt-10 text-center text-red-500">
        Error while Loading Posts...
      </h1>
    );
  }
  return (
    <div className="mb-7">
      {/* @ts-ignore */}
      {data.data.length == 0 ? (
        <h1 className="text-center mt-8 text-xl font-semibold">
          Be the first one to create!!!
        </h1>
      ) : (
        <>
          {/* @ts-ignore */}
          {data.data.map((post: PostItemProps) => (
            <PostItem key={post.id} {...post} />
          ))}
        </>
      )}
    </div>
  );
}

export default Posts;
