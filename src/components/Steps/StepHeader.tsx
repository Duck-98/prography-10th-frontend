/**
 * 스텝 헤더 컴포넌트
 */

interface StepHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex items-center w-fit">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-24 ${
                  index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
