import { Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import ResultPage from './pages/ResultPage';
import Stack from './pages/StackPage';
import OverviewPage from './pages/OverviewPage';
import GroundRulePage from './pages/GroundRulePage';
import CommitPage from './pages/CommitPage';
import CodePage from './pages/CodePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/overview" element={<OverviewPage />} />
      <Route path="/stack" element={<Stack />} />
      <Route path="/groundrule" element={<GroundRulePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/commit" element={<CommitPage />} />
      <Route path="/code" element={<CodePage />} />
    </Routes>
  );
};

export default Router;
