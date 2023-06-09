"use client";

import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button
      className="btn btn-accent text-white"
      onClick={() => void signIn("auth0")}
    >
      LOGIN
    </button>
  );
}

export default LoginButton;
