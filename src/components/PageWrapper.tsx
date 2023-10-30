import { FC } from "react";

interface PageWrapperProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  title,
  action,
}) => {
  return (
    <main className="max-w-7xl p-10">
      <div className="mb-5 flex justify-between">
        <h1 className="font-cal text-3xl font-bold dark:text-white">{title}</h1>
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

export const PageAction = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: any;
}) => {
  return <div className={className}>{children}</div>;
};
