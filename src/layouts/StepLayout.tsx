/**
 * 퍼널 스탭 레이아웃
 */

interface StepLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const StepLayout = ({
  title,
  description,
  children,
}: StepLayoutProps) => {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <div className="w-full h-0.5 bg-blue-500 mb-4" />
      <h2 className="text-sm text-gray-500 mb-4">{description}</h2>
      {children}
    </div>
  );
};
