"use client";
import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeSiteSubdomain } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

interface ChangeSiteSubdomain {
  subdomain: string;
  id: string;
}

const ChangeSiteSubdomain: FC<ChangeSiteSubdomain> = ({ subdomain, id }) => {
  const [value, setValue] = useState<string>(subdomain);
  const router = useRouter();
  const { mutateAsync: update, isPending } = changeSiteSubdomain();

  const onSubmit = (e: any) => {
    e.preventDefault();

    update({ subdomain: value, siteId: id })
      .then(() => {
        toast.success("You successfully changed the subdomain of your site");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong. Please try again later"));
  };

  return (
    <div className="rounded-md border">
      <div className="p-10">
        <h1 className="text-xl font-semibold">Subdomain</h1>
        <form
          onSubmit={(e) => onSubmit(e)}
          id="submitSubdomain"
          className="mt-5"
        >
          <p className="select-none text-sm font-medium text-stone-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-stone-400">
            The subdomain for your site.
          </p>
          <div className="mt-3 flex max-w-md items-center rounded-md border">
            <Input
              placeholder={subdomain}
              id="changeSiteD"
              name="changeSiteD"
              value={value}
              maxLength={32}
              minLength={2}
              onChange={(e) => setValue(e.target.value)}
              className="rounded-r-none border-none px-4 placeholder:text-stone-600 "
            />
            <div className="rounded-r-md bg-stone-900 p-2">
              <span className="text-xs">
                {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-md border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <div>
          <Label className="text-sm text-stone-500 dark:text-stone-400">
            Please use 32 characters maximum.
          </Label>
        </div>
        <div>
          <Button
            type="submit"
            form="submitSubdomain"
            disabled={isPending}
            className="min-w-[119px] dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900"
          >
            {isPending ? <LoadingDots color="#fff" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSiteSubdomain;
