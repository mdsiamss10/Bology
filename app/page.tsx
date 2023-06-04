import AddPost from "@/components/AddPost";
import Posts from "@/components/Posts";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="px-4 md:px-0 flex flex-col">
        {session && <AddPost session={session} />}
        <div className="divider mt-0"></div>
        <Posts />
      </div>
    </>
  );
}

export default Home;
