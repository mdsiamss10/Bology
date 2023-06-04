"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      className="btn text-gray-600"
      onClick={() => {
        if (confirm("Are you sure to signout?")) {
          void signOut();
        }
      }}
    >
      LOGOUT
    </button>
  );
}

export default LogoutButton;
