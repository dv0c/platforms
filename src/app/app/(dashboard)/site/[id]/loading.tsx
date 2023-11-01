// a bunch of loading divs

import { PageContent, PageWrapper } from "@/components/PageWrapper";
import PlaceholderCard from "@/components/PlaceholderCard";

export default function Loading() {
  return (
    <PageWrapper
      title=""
      action={
        <div className="h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
      }
    >
      <PageContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PlaceholderCard key={i} />
          ))}
        </div>
      </PageContent>
    </PageWrapper>
  );
}
