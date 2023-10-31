"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteSite } from "@/lib/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  id: string;
}

const DeleteSite = ({ id }: IProps) => {
  const { data, update: authUpdate } = useSession();
  const router = useRouter();
  const { mutateAsync: del } = deleteSite();
  const [name, setName] = useState<string>("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    del({ siteId: id }).then(() => router.push("sites"));
  };

  return (
    <div className="mb-10 rounded-md border border-destructive/90">
      <div className="p-10">
        <h1 className="text-xl font-semibold">Delete Site</h1>
        <form onSubmit={(e) => onSubmit(e)} id="submitName" className="mt-5">
          <Label className="text-sm text-stone-500 dark:text-stone-400">
            Deletes your site and all posts associated with it. Type in the name
            of your site subdomain to confirm.
          </Label>
          <Input
            id="subdomain"
            name="subdomain"
            className="mt-3 max-w-md border-stone-500"
            value={name}
            placeholder="subdomain"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-md border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <div>
          <Label className="text-sm text-stone-500 dark:text-stone-400">
            This action is irreversible. Please proceed with caution.
          </Label>
        </div>
        <div>
          <Button
            form="submitName"
            type="submit"
            variant={"destructive"}
            // disabled={update.isPending || true}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSite;
