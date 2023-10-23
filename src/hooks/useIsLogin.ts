import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useIsLogin = () => {
  const name = localStorage.getItem('project_name');
  const id = localStorage.getItem('id');

  const navigator = useNavigate();

  useEffect(() => {
    if (!name && !id) {
      console.log('이동요청');
      alert('로그인이 필요합니다.');
      navigator('/');
      return;
    }
    return;
  }, []);
  return;
};

export default useIsLogin;
