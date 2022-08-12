import { useMount } from 'react-use';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/auth';
import { setAxiosConfig } from './api';
import AppRoutes from './App.routes';
import Header from './components/global/Header';

import './styles/reset.css';

function App() {
  const setAuthToken = useSetRecoilState(authState);
  const token = localStorage.getItem('token');

  useMount(() => {
    if (token) {
      setAuthToken({ token });
    }
  });

  setAxiosConfig(token);

  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
