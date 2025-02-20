/**
 * 페이지 레이아웃 컴포넌트
 *
 * 페이지 레이아웃을 위한 컴포넌트
 */

import { cn } from "@/utils/cn";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center p-4 min-h-screen bg-gray-50",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageLayout;
