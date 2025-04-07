"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center h-screen">
      {session ? (
        <div className="text-center">
          <h3 className="text-lg font-semibold">Welcome, {session.user?.name}</h3>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => signIn("google")}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-800 text-white py-2 rounded-md mt-3"
          >
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
};
