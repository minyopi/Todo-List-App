import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/auth';
import { setAxiosConfig } from './api';
import AppRoutes from './App.routes';
import Header from './components/global/Header';

import './styles/reset.css';

function App() {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authState);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || typeof token !== 'string') {
      setAuthToken({ token: undefined });
      alert('로그인이 필요합니다');
      navigate('/auth');

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
