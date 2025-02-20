/**
 * 컴포넌트 레이아웃 컴포넌트
 */

interface ComponentLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

const ComponentLayout = ({
  children,
  maxWidth = "max-w-2xl",
  className,
}: ComponentLayoutProps) => {
  return (
    <div
      className={`p-4 w-full bg-white rounded-lg shadow-lg ${maxWidth} md:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default ComponentLayout;
