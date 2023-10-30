import Nav from "@/components/nav";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/server/auth";
import Logout from "./_components/logout";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const _a = await getSession();
  return (
    <main>
      <Nav userImage={_a?.user.image!}>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={_a?.user.image!} />
            </Avatar>
            <span className="text-xs ">{_a?.user.name}</span>
          </div>
          <Logout />
        </div>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">{children}</div>
    </main>
  );
};

export default DashboardLayout;
