"use server";

import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export const getSiteFromPostId = async (postId: string) => {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};
