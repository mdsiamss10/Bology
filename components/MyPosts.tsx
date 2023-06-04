"use client";

import { PostItemProps } from "@/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostItem from "./PostItem";

function MyPosts() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await axios.get("/api/posts/authPosts"),
    queryKey: ["authPosts"],
  });
  if (isLoading) {
    return (
      <span className="loading loading-dots text-gray-500 mx-auto mt-10 text-center w-16" />
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
    <>
      <div>
        {data.data.length == 0 ? (
          <h1>You don&apos;t have any post yet</h1>
        ) : (
          <>
            <h1 className="my-3 text-lg  text-gray-800 font-semibold">
              Your posts - {data.data.length}
            </h1>
            {data.data.map((post: PostItemProps) => (
              <>
                <PostItem key={post.id} {...post} isInDashboard={true} />
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default MyPosts;
