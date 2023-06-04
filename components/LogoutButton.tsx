"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button className="btn text-gray-600" onClick={() => void signOut()}>
      LOGOUT
    </button>
  );
}

export default LogoutButton;
