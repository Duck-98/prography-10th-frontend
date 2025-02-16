import { Radio } from "@/components/common/Radio";
import { consentOptions } from "@/constants/consentOptions";
import { StepLayout } from "@/layouts/StepLayout";

interface ConsentStepProps {
  consent?: string;
  onConsentChange: (value: string) => void;
}

export const ConsentStep = ({ consent, onConsentChange }: ConsentStepProps) => {
  return (
    <StepLayout
      title="개인정보 수집 동의"
      description="프로그라피 10기 지원을 위한 개인정보 수집에 대한 동의가 필요합니다."
    >
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <div className="mb-4">
          <p className="font-bold mb-2">
            수집 목적: Prography 10기 리쿠르팅 과정 및 결과 안내
          </p>
          <p className="mb-2">
            수집 항목: 이름, 이메일, 핸드폰번호, 학교 정보 및 직장 정보
          </p>
          <p>보유 및 이용 기간: 리쿠르팅 과정 종료일(3월 7일) 이후 파기</p>
        </div>

        <div>
          <p className="mb-4">
            개인정보 수집여부 동의 여부를 체크해주세요.{" "}
            <span className="text-red-500">*</span>
          </p>
          <Radio
            options={consentOptions}
            selectedValue={consent}
            onChange={(value) => {
              onConsentChange(value);
            }}
          />
        </div>
      </div>
    </StepLayout>
  );
};
