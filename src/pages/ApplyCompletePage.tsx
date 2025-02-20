import ComponentLayout from "@/layouts/ComponentLayout";
import PageLayout from "@/layouts/PageLayout";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
// import { CheckIcon } from "@heroicons/react/24/solid";

const ApplyCompletePage = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <ComponentLayout className="mb-6">
        <div className="flex justify-center">
          <div className="text-3xl font-bold">Prography 10기 지원서</div>
        </div>
      </ComponentLayout>
      <ComponentLayout className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="flex flex-col gap-14 items-center">
          <div className="p-4 bg-blue-500 rounded-full">
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12.6667L8.66667 17.3333L20 6"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-check"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold">지원이 완료되었습니다!</h1>
            <p className="text-center text-gray-600">
              프로그래피 10기 지원해주셔서 감사합니다.
              <br />
              서류 심사 결과는 입력하신 이메일로 안내드릴 예정입니다.
            </p>
          </div>

          <Button onClick={() => navigate("/", { replace: true })}>
            홈으로 돌아가기
          </Button>
        </div>
      </ComponentLayout>
    </PageLayout>
  );
};

export default ApplyCompletePage;
