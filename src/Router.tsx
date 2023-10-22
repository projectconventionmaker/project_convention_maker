import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import ResultPage from './pages/ResultPage';
import Stack from './pages/StackPage';
import Overview from './components/Overview';
import CommitPage from './pages/CommitPage';
import CodePage from './pages/CodePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/stack" element={<Stack />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/commit" element={<CommitPage />} />
      <Route path="/code" element={<CodePage />} />
    </Routes>
  );
};

export default Router;
