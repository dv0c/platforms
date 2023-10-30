"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div className=" cursor-pointer" onClick={() => signOut()}>
      <LogOut className="h-4 w-4" />
    </div>
  );
};

export default Logout;
