import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FullPageLoading } from "./components/Loading";

const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));
const ApplyCompletePage = lazy(() => import("./pages/ApplyCompletePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          <Route path="/" element={<RecruitmentPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/apply/complete" element={<ApplyCompletePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
