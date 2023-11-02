"use client";
import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { changeSiteDescription } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

interface ChangeNameProps {
  description: string;
  id: string;
}

const ChangeSiteName: FC<ChangeNameProps> = ({ description, id }) => {
  const [value, setValue] = useState<string>(description);
  const router = useRouter();
  const { mutateAsync: update, isPending } = changeSiteDescription();

  const onSubmit = (e: any) => {
    e.preventDefault();

    update({ description: value, siteId: id })
      .then(() => {
        toast.success("You successfully changed the description of your site");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong. Please try again later"));
  };

  return (
    <div className="rounded-md border">
      <div className="p-10">
        <h1 className="text-xl font-semibold">Description</h1>
        <form onSubmit={(e) => onSubmit(e)} id="submitDesc" className="mt-5">
          <p className="select-none text-sm font-medium text-stone-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-stone-400">
            The description of your site. This will be used as the meta title on
            Google as well.
          </p>
          <Textarea
            id="changeSiteDesc"
            name="changeSiteDesc"
            className="mt-3 max-w-md border-stone-500"
            placeholder={description}
            value={value}
            maxLength={32}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-md border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <div>
          <Label className="text-sm text-stone-500 dark:text-stone-400">
            Include SEO-optimized keywords that you want to rank for.
          </Label>
        </div>
        <div>
          <Button
            type="submit"
            form="submitDesc"
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

export default ChangeSiteName;
