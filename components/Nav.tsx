import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import LoginButton from "./LoginButton";
import NavLogoButton from "./NavLogoButton";
import ProfileImage from "./ProfileImage";

async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex sticky top-0 justify-between items-center py-4 px-4 md:px-0 backdrop-blur-md z-10">
      <Suspense>
        <NavLogoButton />
      </Suspense>
      {/* If logged in, show profile icon otherwise show login button */}
      <div>
        {session ? <ProfileImage session={session} /> : <LoginButton />}
      </div>
    </div>
  );
}

export default Nav;
