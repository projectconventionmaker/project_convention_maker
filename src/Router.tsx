import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import ResultPage from './pages/ResultPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
};

export default Router;
