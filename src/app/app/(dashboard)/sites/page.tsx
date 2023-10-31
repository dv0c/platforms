import { PageContent, PageWrapper } from "@/components/PageWrapper";
import CreateNewSite from "./_components/CreateNewSite";
import Image from "next/image";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import SiteCard from "@/components/SiteCard";

const page = async () => {
  const _a = await getSession();

  if (!_a) return redirect("/");

  const sites = await db.site.findMany({
    where: {
      userId: _a.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
    ...(10 ? { take: 10 } : {}),
  });

  return (
    <PageWrapper title="All Sites" action={<CreateNewSite />}>
      <PageContent>
        {sites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sites.map((site: any) => (
              <SiteCard key={site.id} data={site} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Image
              src={"https://illustrations.popsy.co/gray/web-design.svg"}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              draggable="false"
              alt="You do not have any sites yet. Create one to get started."
            />
            <p className="text-stone-500">
              You do not have any sites yet. Create one to get started.
            </p>
          </div>
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default page;
