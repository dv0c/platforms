import { PageContent, PageWrapper } from "@/components/PageWrapper";
import CreateNewSite from "./_components/CreateNewSite";
import Image from "next/image";

const page = () => {
  return (
    <PageWrapper title="All Sites" action={<CreateNewSite />}>
      <PageContent>
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
      </PageContent>
    </PageWrapper>
  );
};

export default page;
