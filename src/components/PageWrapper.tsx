import { FC } from "react";

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, title }) => {
  return (
    <main className="max-w-7xl p-10">
      <div className="mb-5">
        <h1 className="font-cal text-3xl font-bold dark:text-white">{title}</h1>
      </div>
      {children}
    </main>
  );
};

export const PageContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: any;
}) => {
  return <div className={className}>{children}</div>;
};
