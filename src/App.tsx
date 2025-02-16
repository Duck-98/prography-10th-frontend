import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from "./components/Loading";

const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<RecruitmentPage />} />
          <Route path="/apply" element={<ApplyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
