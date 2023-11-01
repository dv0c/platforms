"use client";
import LoadingDots from "@/components/icons/loading-dots";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteSite } from "@/lib/queries";
import { Kbd } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  subdomain: string;
  id: string;
}

const DeleteSite = ({ id, subdomain }: IProps) => {
  const router = useRouter();
  const { mutateAsync: del, isPending } = deleteSite();
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmitPopup = (e: any) => {
    e.preventDefault();
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (name === subdomain)
      del({ siteId: id })
        .then(() => router.push(process.env.NEXT_PUBLIC_APP_DOMAIN + "/sites"))
        .catch((error) => {
          return toast.error("Something went wrong. Please try again later");
        });
  };

  return (
    <div className="mb-10 rounded-md border border-destructive/90">
      <div className="p-10">
        <h1 className="text-xl font-semibold">Delete Site</h1>
        <form
          onSubmit={(e) => onSubmitPopup(e)}
          id="submitName"
          className="mt-5"
        >
          <p className="select-none text-sm font-medium text-stone-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-stone-400">
            Deletes your site and all posts associated with it. Type in the name
            of your site subdomain{" "}
            <Kbd className="cursor-text select-text">{subdomain}</Kbd> to
            confirm.
          </p>
          <Input
            id="subdomain"
            name="subdomain"
            className="mt-3 max-w-md border-stone-500"
            value={name}
            placeholder={subdomain || "subdomain"}
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
          <AlertDialog open={isOpen}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant={"destructive"}
                className="min-w-[100px]"
                disabled={name !== subdomain}
                onClick={() => setIsOpen(true)}
              >
                {isPending ? <LoadingDots /> : "Delete Site"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your site and remove your posts from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction asChild>
                  <Button
                    form="submitName"
                    type="submit"
                    variant={"destructive"}
                    disabled={name !== subdomain}
                    onClick={onSubmit}
                    className="min-w-[100px]"
                  >
                    {isPending ? <LoadingDots /> : "Delete Site"}
                  </Button>
                </AlertDialogAction>
                <AlertDialogCancel onClick={() => setIsOpen(false)}>
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DeleteSite;
