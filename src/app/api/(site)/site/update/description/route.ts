import { _ChangeSiteDescription, _ChangeSiteName } from "@/lib/Validators";
import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { withSiteAuth } from "@/server/withSiteAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const _$ = await getSession();

  if (!_$?.user.id)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { siteId, description } = _ChangeSiteDescription.parse(body);

  const siteAuth = await withSiteAuth(siteId);

  if (!siteAuth)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const data = await db.site.update({
      where: {
        id: siteId,
      },
      data: {
        description,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
