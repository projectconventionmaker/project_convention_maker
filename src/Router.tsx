import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import ResultPage from './pages/ResultPage';
import Stack from './components/Stack';
import Overview from './components/Overview';


const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
  );
};

export default Router;
