"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateNewSite = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Site</Button>
      </DialogTrigger>
      <DialogContent className="p-10 ">
        <DialogHeader>
          <DialogTitle className="mb-5 text-3xl font-bold">
            Create a new site
          </DialogTitle>
        </DialogHeader>
        <form id="createSite" className="flex flex-col gap-8">
          <div className="space-y-2">
            <Label className="text-stone-400">Site Name</Label>
            <Input
              placeholder="My Awesome Site"
              className="px-4 placeholder:text-stone-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-stone-400">Subdomain</Label>
            <div className="flex items-center rounded-md border">
              <Input
                placeholder="subdomain"
                className="rounded-r-none border-none px-4 placeholder:text-stone-600"
              />
              <div className="rounded-r-md bg-stone-700 p-2">
                <span className="text-xs ">
                  {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-stone-400">Description</Label>
            <Textarea
              className="min-h-[100px] p-5 placeholder:text-stone-600"
              placeholder="Description about why my site is so awesome"
            />
          </div>
        </form>
        <DialogFooter>
          <Button className="flex max-w-xl items-center sm:justify-between">
            Create Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewSite;
