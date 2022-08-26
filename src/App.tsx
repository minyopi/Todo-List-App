import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/common';
import { authState } from './store/auth';
import AppRoutes from './App.routes';
import useSetAxiosConfig from './hooks/useSetAxiosConfig';

import './styles/global.css';

function App() {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authState);
  const queryClient = new QueryClient();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || typeof token !== 'string') {
      setAuthToken({ token: undefined });
      navigate('/auth');

      return;
    }

    setAuthToken({ token });
  }, [token, navigate, setAuthToken]);

  useSetAxiosConfig(token);

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
