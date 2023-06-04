"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function NavLogoButton() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link className="text-xl font-semibold select-none bloggyText" href={"/"}>
      {!pathname?.includes("/post") || pathname !== "/dashboard" ? (
        "Bologyy"
      ) : (
        <FaArrowLeft className="ml-0" />
      )}
    </Link>
  );
}

export default NavLogoButton;
