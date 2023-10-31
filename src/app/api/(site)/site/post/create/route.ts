import { _CreatePost } from "@/lib/Validators";
import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { withSiteAuth } from "@/server/withSiteAuth";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const _$ = await getSession();

  if (!_$?.user.id)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { siteId, userId } = _CreatePost.parse(body);

  const siteAuth = await withSiteAuth(siteId);

  if (!siteAuth)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const data = (await db.post.create({
      data: {
        siteId,
        userId,
      },
    })) as Post;
    return NextResponse.json(
      { success: true, data: { id: data.id } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
