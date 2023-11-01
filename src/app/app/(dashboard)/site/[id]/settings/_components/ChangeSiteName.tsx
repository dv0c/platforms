"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeSiteName } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

interface ChangeNameProps {
  name: string;
  id: string;
}

const ChangeSiteName: FC<ChangeNameProps> = ({ name, id }) => {
  const [value, setValue] = useState<string>(name);
  const router = useRouter();
  const { mutateAsync: update, isPending } = changeSiteName();

  const onSubmit = (e: any) => {
    e.preventDefault();

    update({ name: value, siteId: id })
      .then(() => {
        toast.success("You successfully changed the name of your site");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong. Please try again later"));
  };

  return (
    <div className="mb-10 rounded-md border">
      <div className="p-10">
        <h1 className="text-xl font-semibold">Name</h1>
        <form onSubmit={(e) => onSubmit(e)} id="submitName" className="mt-5">
          <p className="select-none text-sm font-medium text-stone-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-stone-400">
            The name of your site. This will be used as the meta title on Google
            as well.
          </p>
          <Input
            id="changeSite"
            name="changeSite"
            className="mt-3 max-w-md border-stone-500"
            placeholder={name}
            value={value}
            maxLength={32}
            onChange={(e) => setValue(e.target.value)}
          />
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
            form="submitName"
            disabled={isPending}
            className="dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSiteName;
