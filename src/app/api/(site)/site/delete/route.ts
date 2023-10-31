import { _DeleteSite } from "@/lib/Validators";
import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { withSiteAuth } from "@/server/withSiteAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const _$ = await getSession();

  if (!_$?.user.id)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { siteId } = _DeleteSite.parse(body);

  const siteAuth = await withSiteAuth(siteId);

  if (!siteAuth)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const data = await db.site.delete({
      where: {
        id: siteId,
      },
    });
    return NextResponse.json(
      { success: true, data: { id: data.id } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
