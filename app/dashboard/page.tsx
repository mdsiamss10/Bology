import MyPosts from "@/components/MyPosts";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mt-2 mb-4">
          Welcome back, {session?.user?.name}
        </h1>
        <div className="divider"></div>
        <MyPosts />
      </div>
    </>
  );
}

export default Dashboard;
