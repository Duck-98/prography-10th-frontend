/**
 * 지원 분야 선택 스탭
 */
// src/components/Steps/PositionStep.tsx
import { StepLayout } from "@/layouts/StepLayout";
import { Radio } from "@/components/common/Radio";
import { positionOptions } from "@/constants/positionOptions";

interface PositionStepProps {
  initialPosition?: string;
  onSubmit: (position: string) => void;
  onBack: () => void;
}

export const PositionStep = ({
  initialPosition,
  onSubmit,
}: //   onBack,
PositionStepProps) => {
  return (
    <StepLayout
      title="지원 포지션 선택"
      description="지원하고 싶은 포지션을 선택해 주세요."
    >
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <div className="mb-4">
          <p className="mb-4">
            지원 포지션을 선택해주세요. <span className="text-red-500">*</span>
          </p>
          <Radio
            options={positionOptions}
            selectedValue={initialPosition}
            onChange={(value) => {
              if (value) {
                onSubmit(value as string);
              }
            }}
          />
        </div>
      </div>
    </StepLayout>
  );
};
