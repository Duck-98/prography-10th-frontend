import { Link } from "react-router-dom";

/**
 * 404 페이지
 */

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-xl">페이지를 찾을 수 없습니다</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        메인페이지로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
