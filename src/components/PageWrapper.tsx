import { FC } from "react";

interface PageWrapperProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  subdomain?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  title,
  action,
  subdomain,
}) => {
  return (
    <main className="max-w-7xl p-10">
      <div className="mb-5 flex justify-between">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            {title}
          </h1>
          {subdomain && (
            <a
              style={{ marginTop: 4 }}
              href={subdomain}
              className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
            >
              {subdomain} ↗️
            </a>
          )}
        </div>
        <div>{action}</div>
      </div>
      {children}
    </main>
  );
};

export const PageContent = ({
  children,
}: {
  children: React.ReactNode;
  className?: any;
}) => {
  return <div>{children}</div>;
};
