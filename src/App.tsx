import { useMount } from 'react-use';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/auth';
import AppRoutes from './App.routes';
import Header from './components/global/Header';

import './styles/reset.css';

function App() {
  const setAuthToken = useSetRecoilState(authState);

  useMount(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthToken({ token });
    }
  });

  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
