import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

function ProfileImage({ session }: { session: Session }) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <div className="w-14 avatar cursor-pointer">
          <Image
            src={session?.user?.image ?? ""}
            alt={`${session?.user?.name ?? ""}'s image`}
            width={1000}
            height={1000}
            className="rounded-full"
            priority
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content w-60 menu p-2 shadow bg-base-100 rounded-box"
      >
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="my-2 text-center">{session.user?.email}</li>
        <LogoutButton />
      </ul>
    </div>
  );
}

export default ProfileImage;
