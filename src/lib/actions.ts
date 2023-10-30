"use server";

import { db } from "@/server/db";

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
