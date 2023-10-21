import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import ResultPage from './pages/ResultPage';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/intro" element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
