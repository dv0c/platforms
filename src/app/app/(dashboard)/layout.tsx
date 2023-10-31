import Nav from "@/components/nav";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/server/auth";
import Logout from "./_components/logout";
import { Suspense } from "react";
import Profile from "@/components/Profile";
import { notFound } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const _a = await getSession();
  console.log(_a?.user);

  if (!_a?.user.id) return notFound();
  return (
    <main>
      <Nav userImage={_a.user.image!} plan={_a.user.plan} role={_a.user.role}>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">{children}</div>
    </main>
  );
};

export default DashboardLayout;
