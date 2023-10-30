import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  const session = await getSession();

  if (!session?.user.id) return Response.json("Not authenticated");

  const update = await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: params.name,
    },
  });
  console.log(params);
  console.log(update);

  return Response.json("Updated");
}
