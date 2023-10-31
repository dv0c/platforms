import { PageContent, PageWrapper } from "@/components/PageWrapper";
import DeleteSite from "./_components/DeleteSite";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <PageWrapper title="Settings for subdomain" subdomain="">
      <PageContent>
        <DeleteSite id={params.id} />
      </PageContent>
    </PageWrapper>
  );
};

export default page;
