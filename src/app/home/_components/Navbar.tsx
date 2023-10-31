import Logo from "@/components/Logo";
import { Navigation } from "./Navigation";
import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";
import { getSession } from "@/server/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getSession();
  console.log(session?.user);

  return (
    <header className="container py-5">
      <nav className="flex items-center">
        <div className="mr-auto">
          <Logo />
        </div>
        <Navigation />
        <div className="ml-auto flex items-center gap-3">
          {session?.user && (
            <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN!}>
              <Button variant={"ghost"}>Go to dashboard</Button>
            </Link>
          )}
          <Profile session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
