/**
 * 지원 분야 선택 스탭
 */
import { StepLayout } from "@/layouts/StepLayout";
import { Radio } from "@/components/common/Radio";
import { positionOptions } from "@/constants/positionOptions";

interface PositionStepProps {
  selectedPosition?: string;
  onSubmit: (position: string) => void;
}

export const PositionStep = ({
  selectedPosition,
  onSubmit,
}: PositionStepProps) => {
  const handlePositionChange = (position: string) => {
    onSubmit(position);
  };

  return (
    <StepLayout
      title="지원 포지션 선택"
      description="지원하고 싶은 포지션을 선택해 주세요."
    >
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <div className="mb-4">
          <p className="mb-4">
            지원 포지션을 선택해주세요. <span className="text-red-500">*</span>
          </p>
          <Radio
            options={positionOptions}
            selectedValue={selectedPosition}
            onChange={handlePositionChange}
          />
        </div>
      </div>
    </StepLayout>
  );
};
