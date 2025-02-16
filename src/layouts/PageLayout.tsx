/**
 * 페이지 레이아웃 컴포넌트
 *
 * 페이지 레이아웃을 위한 컴포넌트
 */

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {children}
    </div>
  );
};

export default PageLayout;
