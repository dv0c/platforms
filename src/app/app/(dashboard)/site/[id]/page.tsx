import CreatePost from "@/components/CreatePost";
import { PageContent, PageWrapper } from "@/components/PageWrapper";
import Posts from "@/components/Posts";
import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
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
      title="All Posts for subdomain"
      action={<CreatePost siteId={data.id} userId={session.user.id} />}
      subdomain={data.subdomain + "." + process.env.NEXT_PUBLIC_ROOT_DOMAIN!}
    >
      <PageContent>
        <Posts siteId={decodeURIComponent(params.id)} />
      </PageContent>
    </PageWrapper>
  );
};

export default page;
