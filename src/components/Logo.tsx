import { cn } from "@/lib/utils";
import { Share } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  className?: string;
  name?: boolean;
}

const Logo: FC<LogoProps> = ({ className, name }) => {
  return (
    <Link
      href={`http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
      className="flex items-center gap-3"
    >
      {/* <Image width={24} height={24} alt="paranoia" src={"/logo.png"} /> */}
      <Share className="hidden h-5 w-5 sm:block" />
      <h1
        className={cn("font-semibold", className, !name ? "block" : "hidden")}
      >
        Paranoia
      </h1>
    </Link>
  );
};

export default Logo;
