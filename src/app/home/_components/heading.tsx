import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Heading = () => {
  return (
    <div>
      <div className="container mt-[10rem] flex w-full flex-col items-center justify-center">
        <h1 className="text-5xl font-bold md:text-7xl">Significantly</h1>
        <h1 className="text-5xl font-bold md:text-7xl">improve your job</h1>
        <div className="mt-10 flex gap-3">
          <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN!}>
            <Button size={"lg"}>Start free trial</Button>
          </Link>
          <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN!}>
            <Button size={"lg"} variant={"outline"}>
              Create an account
            </Button>
          </Link>
        </div>
        <div className="relative mt-10 h-[820px] w-full overflow-hidden rounded-t-3xl">
          <Image
            alt="dashboard"
            className="object-cover object-left"
            fill
            src={"/dashboard.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default Heading;
