"use client";
import { PageContent, PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeUser } from "@/lib/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { data, update: authUpdate } = useSession();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const update = changeUser();

  useEffect(() => {
    if (data?.user?.name && data?.user?.email) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
    }
  }, [data]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    update.mutateAsync(name).finally(() => {
      authUpdate();
      router.refresh();
    });
  };

  return (
    <PageWrapper title="Settings">
      <PageContent>
        <div className="mb-10 rounded-md border">
          <div className="p-10">
            <div className="mb-3">
              <h4 className="text-xs text-red-400">WORK IN PROGRESS</h4>
              <h4 className="text-xs text-red-400">
                You have to refresh the page after your change your name.
              </h4>
            </div>
            <h1 className="text-xl font-semibold">Name</h1>
            <form
              onSubmit={(e) => onSubmit(e)}
              id="submitName"
              className="mt-5"
            >
              <Label className="text-sm text-stone-500 dark:text-stone-400">
                Your name on this app.
              </Label>
              <Input
                id="changeName"
                name="changeName"
                className="mt-3 max-w-md border-stone-500"
                value={name}
                placeholder="John Doe"
                maxLength={32}
                onChange={(e) => setName(e.target.value)}
                disabled={!!!name || true}
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
                form="submitName"
                type="submit"
                className="dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900"
                variant={"default"}
                disabled={update.isPending || true}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-md border">
          <div className="p-10">
            <div className="mb-3">
              <h4 className="text-xs text-red-400">WORK IN PROGRESS</h4>
              <h4 className="text-xs text-red-400">
                You have to refresh the page after your change your name.
              </h4>
            </div>
            <h1 className="text-xl font-semibold">Email</h1>
            <form
              onSubmit={(e) => onSubmit(e)}
              id="submitEmail"
              className="mt-5"
            >
              <Label className="text-sm text-stone-500 dark:text-stone-400">
                Your email on this app.
              </Label>
              <Input
                id="changeEmail"
                name="changeEmail"
                className="mt-3 max-w-md border-stone-500"
                value={email}
                placeholder="johndoe@example.com"
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!!email || true}
              />
            </form>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-md border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
            <div className="">
              <Label className="text-sm text-stone-500 dark:text-stone-400">
                Please use vaild email address.
              </Label>
            </div>
            <div>
              <Button
                form="submitEmail"
                type="submit"
                className="dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900"
                variant={"default"}
                disabled
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default page;
