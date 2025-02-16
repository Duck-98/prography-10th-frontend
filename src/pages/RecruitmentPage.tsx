/**
 * 모집 소개 페이지
 */

import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import ComponentLayout from "@/layouts/ComponentLayout";
import Button from "@/components/common/Button";

const RecruitmentPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* 로고 */}
      <ComponentLayout>
        <div className="flex justify-center mb-6">
          <img
            src="src/assets/images/prography.png"
            alt="Prography logo"
            className="h-8 md:h-10"
          />
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-center text-lg md:text-xl mb-4 font-bold">
          안녕하세요. 새로운 가치를 만들어가는 IT커뮤니티, Prography 입니다.
        </h1>

        {/* 서브 타이틀 - 모집 시작 */}
        <div className="text-center text-blue-600 font-medium mb-6">
          드디어 Prography 10기 모집이 시작되었습니다.
        </div>

        {/* 모집 파트 */}
        <div className="text-center mb-8">
          <p className="mb-2">
            Product Owner / Design / iOS / AOS / Frontend(React) /
            Backend(Spring)
          </p>
          <p className="text-gray-600">총 6개의 파트를 모집합니다.</p>
        </div>

        {/* 체크리스트 */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">✓</span>
            <p>새로운 가치를 만들어내는데 기술이 두근거리신다면,</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">✓</span>
            <p>열정적인 IT인들과 함께 사이드 프로젝트를 하고 싶으시다면,</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">✓</span>
            <p>탁월한 동료들과 짜릿한 성취감을 느껴보고 싶으시다면,</p>
          </div>
        </div>

        {/* 슬로건 */}
        <div className="text-center mb-8">
          <h2 className="text-blue-600 font-bold text-xl md:text-2xl mb-4">
            "프로답게, 재미있게"
          </h2>
          <p className="text-gray-800">
            재미있는 작당을 함께 만들어갈 10기에 참여하세요.
          </p>
        </div>

        {/* 안내문구 */}
        <p className="text-center text-sm text-gray-600 mb-6">
          📌 자세한 정보는 아래 페이지에 담아뒀으니, 지원 전 꼭 확인해주세요 ✨
        </p>

        {/* 링크 버튼들 */}
        <div className="space-y-4">
          <a
            href="#"
            className="block text-center bg-blue-100 text-blue-600 py-3 rounded-lg hover:bg-blue-200 transition-colors"
          >
            🎯 프로그래피 10기 모집 자세히 알아보기
          </a>
          <a
            href="#"
            className="block text-center bg-green-100 text-green-600 py-3 rounded-lg hover:bg-green-200 transition-colors"
          >
            🌐 공식 홈페이지
          </a>
          <a
            href="#"
            className="block text-center bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            🔗 인스타그램
          </a>
        </div>

        {/* 지원하기 버튼 */}
        <Button
          onClick={() => navigate("/apply")}
          className="w-full mt-8"
          variant="primary"
        >
          지원하기
        </Button>
      </ComponentLayout>
    </PageLayout>
  );
};

export default RecruitmentPage;
