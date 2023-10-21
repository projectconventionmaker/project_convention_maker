import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import ResultPage from './pages/ResultPage';
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';

const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <Header />
            <Nav />
          </>
        }
      >
        <Route path="/" element={<MainPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Route>
      <Route path="/intro" element={<IntroPage />} />
    </Routes>
  );
};

export default Router;
