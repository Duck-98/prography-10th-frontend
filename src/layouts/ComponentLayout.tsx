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
      className={`bg-white rounded-lg shadow-lg w-full ${maxWidth} p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default ComponentLayout;
