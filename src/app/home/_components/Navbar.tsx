import Logo from "@/components/Logo";
import { Navigation } from "./Navigation";
import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";
import { getSession } from "@/server/auth";

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
          {session?.user && <Button variant={"ghost"}>Go to dashboard</Button>}
          <Profile session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
