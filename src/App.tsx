import { useSetRecoilState } from 'recoil';
import { authState } from './store/auth';
import { setAxiosConfig } from './api';
import AppRoutes from './App.routes';
import Header from './components/global/Header';

import './styles/reset.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const setAuthToken = useSetRecoilState(authState);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && typeof token !== 'string') {
      setAuthToken({ token: undefined });
      navigate('/auth');
      alert('로그인이 필요합니다');
      return;
    }

    setAuthToken({ token });
  }, [token]);

  setAxiosConfig(token);

  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
