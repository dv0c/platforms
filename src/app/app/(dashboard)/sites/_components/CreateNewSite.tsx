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
import { useRouter } from "next/navigation";

const CreateNewSite = () => {
  const router = useRouter();
  const { mutateAsync: create, isPending } = createSite();

  const form = useForm<z.infer<typeof _CreateSite>>({
    resolver: zodResolver(_CreateSite),
    defaultValues: {
      name: "",
      description: "",
      subdomain: "",
    },
  });

  function onSubmit(values: z.infer<typeof _CreateSite>) {
    create(values)
      .then((res) => {
        router.push(process.env.NEXT_PUBLIC_APP_DOMAIN + "/site/" + res.id);
        return toast.success("Site created successfully");
      })
      .catch((error) => {
        if (error.response.status === 412) {
          return toast.error("This subdomain is already taken");
        }
        return toast.error("Something went wrong. Please try again later");
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
                      onKeyUp={() =>
                        form.setValue("subdomain", form.getValues("name"))
                      }
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
