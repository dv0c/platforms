"use client";
import { createPost } from "@/lib/queries";
import { Button } from "./ui/button";
import LoadingDots from "./icons/loading-dots";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface IProps {
  siteId: string;
  userId: string;
}

const CreatePost = ({ siteId, userId }: IProps) => {
  const router = useRouter();
  const { mutateAsync: create, isPending } = createPost();

  const onClick = () => {
    try {
      create({ siteId, userId }).then((res) => {
        toast.success("Post created successfully");
        router.push(`/post/${res.data.id}`);
      });
    } catch (error) {
      toast.error("Error creating post");
    }
  };

  return (
    <Button className="min-w-[136px]" disabled={isPending} onClick={onClick}>
      {isPending ? <LoadingDots /> : "Create New Post"}
    </Button>
  );
};

export default CreatePost;
