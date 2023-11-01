import { PageContent, PageWrapper } from "@/components/PageWrapper";
import DeleteSite from "./_components/DeleteSite";
import { db } from "@/server/db";
import { getSession } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import ChangeSiteName from "./_components/ChangeSiteName";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await db.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <PageWrapper
      title="Settings for subdomain"
      subdomain={data.subdomain + "." + process.env.NEXT_PUBLIC_ROOT_DOMAIN}
    >
      <PageContent>
        <div className="space-y-3">
          <ChangeSiteName name={data.name as string} id={params.id} />
          <DeleteSite subdomain={data.subdomain as string} id={params.id} />
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default page;
