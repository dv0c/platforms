import Logo from "@/components/Logo";
import { Navigation } from "./Navigation";
import User from "@/components/User";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="container py-5">
      <nav className="flex items-center">
        <div className="mr-auto">
          <Logo />
        </div>
        <Navigation />
        <div className="ml-auto flex items-center gap-3">
          <Button variant={"ghost"}>Go to dashboard</Button>
          <User />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
