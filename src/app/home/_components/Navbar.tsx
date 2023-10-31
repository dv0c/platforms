import Logo from "@/components/Logo";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui/button";
import { getSession } from "@/server/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await getSession();
  console.log(session?.user);

  return (
    <header className="container py-5">
      <nav className="flex items-center">
        <div className="flex gap-5">
          <Logo />
          {/* <Navigation /> */}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href={process.env.NEXT_PUBLIC_APP_DOMAIN!}
            className="space-x-2"
          >
            <Button variant={"ghost"}>Sign in</Button>
            <Button variant={"default"}>Create an account</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
