import { _CreateSite } from "@/lib/Validators";
import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const _$ = await getSession();

  const body = await req.json();

  const { name, description, subdomain } = _CreateSite.parse(body);

  if (!_$?.user.id)
    return new Response(JSON.stringify({ error: "Not authenticated" }));

  const isSameDomain = await db.site.findFirst({
    where: {
      subdomain,
    },
  });
  if (isSameDomain)
    return NextResponse.json(
      { error: "Subdomain already taken" },
      { status: 412 },
    );

  try {
    await db.site.create({
      data: {
        name,
        description,
        subdomain,
        user: {
          connect: {
            id: _$.user.id,
          },
        },
      },
    });
    return new Response(JSON.stringify("OK"));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }));
  }
}
