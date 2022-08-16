import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { authState } from './store/auth';
import { setAxiosConfig } from './apis';
import AppRoutes from './App.routes';
import { Header } from './components/common';

import './styles/global.css';

function App() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const setAuthToken = useSetRecoilState(authState);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || typeof token !== 'string') {
      setAuthToken({ token: undefined });
      navigate('/auth');

      return;
    }

    setAuthToken({ token });
  }, [token]);

  setAxiosConfig(token);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
