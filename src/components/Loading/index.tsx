const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* 로고 영역 */}
      <div className="flex justify-center">
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* 타이틀 영역 */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>

      {/* 서브 타이틀 */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>

      {/* 모집 파트 */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>

      {/* 체크리스트 */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>

      {/* 버튼들 */}
      <div className="space-y-2">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>

      {/* 지원하기 버튼 */}
      <div className="h-14 bg-gray-200 rounded"></div>
    </div>
  );
};

const FullPageLoading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
};

export { Spinner, SkeletonLoading, FullPageLoading };
