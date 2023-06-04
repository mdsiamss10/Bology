import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LoginButton from "./LoginButton";
import ProfileImage from "./ProfileImage";

async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex sticky top-0 justify-between items-center py-4 backdrop-blur-md z-10">
      <Link className="text-xl font-semibold select-none bloggyText" href="/">
        Bologyy
      </Link>
      {/* If logged in, show profile icon otherwise show login button */}
      <div>
        {session ? <ProfileImage session={session} /> : <LoginButton />}
      </div>
    </div>
  );
}

export default Nav;
