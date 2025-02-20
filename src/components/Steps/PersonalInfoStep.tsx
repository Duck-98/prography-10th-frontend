import { Input } from "@/components/common/Input";
import { StepLayout } from "@/layouts/StepLayout";
import type { PersonalInfoStepType } from "@/types/apply";
import { usePersonalInfoForm } from "@/hooks/valid/usePersonalInfoForm";

interface PersonalInfoStepProps {
  initialData: PersonalInfoStepType;
  onSubmit: (data: PersonalInfoStepType) => void;
  onValidityChange: (isValid: boolean) => void;
}

export const PersonalInfoStep = ({
  initialData,
  onSubmit,
  onValidityChange,
}: PersonalInfoStepProps) => {
  const { formData, errors, touched, handleChange, handleSubmit } =
    usePersonalInfoForm({
      initialData,
      onSubmit,
      onValidityChange,
    });

  return (
    <StepLayout title="기본 정보" description="연락 가능한 정보를 입력해주세요">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg border border-gray-200"
      >
        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            label="성함을 입력해주세요"
            placeholder="홍길동"
            required
            value={formData.name || ""}
            onChange={handleChange}
            error={touched.name ? errors.name : undefined}
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="이메일 주소를 입력해주세요"
            placeholder="prography@gmail.com"
            required
            value={formData.email || ""}
            onChange={handleChange}
            error={touched.email ? errors.email : undefined}
          />

          <Input
            id="phone"
            name="phone"
            label="휴대폰 번호를 입력해주세요"
            placeholder="010-1234-5678"
            required
            value={formData.phone || ""}
            onChange={handleChange}
            error={touched.phone ? errors.phone : undefined}
          />
        </div>
      </form>
    </StepLayout>
  );
};
