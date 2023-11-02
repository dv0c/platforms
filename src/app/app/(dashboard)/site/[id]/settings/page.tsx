import { PageContent, PageWrapper } from "@/components/PageWrapper";
import { db } from "@/server/db";
import { getSession } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import TabsSection from "./_components/TabsSection";

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
        <TabsSection data={data} id={params.id} />
      </PageContent>
    </PageWrapper>
  );
};

export default page;
