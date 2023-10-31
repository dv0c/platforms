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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { _CreateSite } from "@/lib/Validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createSite } from "@/lib/queries";
import { toast } from "sonner";
import LoadingDots from "@/components/icons/loading-dots";

const CreateNewSite = () => {
  const { mutateAsync: create, isPending, error: err, isError } = createSite();

  const form = useForm<z.infer<typeof _CreateSite>>({
    resolver: zodResolver(_CreateSite),
    defaultValues: {
      name: "",
      description: "",
      subdomain: "",
    },
  });

  function onSubmit(values: z.infer<typeof _CreateSite>) {
    toast.promise(create(values), {
      loading: "Creating site...",
      error:
        isError && err.message == "Request failed with status code 412"
          ? "This subdomain is already taken"
          : "Something went wrong. Please try again later",
      success: "Site created successfully",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Site</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-10">
        <DialogHeader>
          <DialogTitle className="mb-5 text-3xl font-bold">
            Create a new site
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asChild>
                    <Label className="text-stone-400">Site Name</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My Awesome Site"
                      className="px-4 placeholder:text-stone-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asChild>
                    <Label className="text-stone-400">Subdomain</Label>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center rounded-md border">
                      <Input
                        {...field}
                        placeholder="subdomain"
                        className="rounded-r-none border-none px-4 placeholder:text-stone-600"
                      />
                      <div className="rounded-r-md bg-stone-900 p-2">
                        <span className="text-xs ">
                          {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asChild>
                    <Label className="text-stone-400">Description</Label>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[100px] p-5 placeholder:text-stone-600"
                      placeholder="Description about why my site is so awesome"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isPending}
                className="mt-3 min-w-[100px] transition"
                type="submit"
              >
                {isPending ? <LoadingDots /> : "Create Site"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewSite;
