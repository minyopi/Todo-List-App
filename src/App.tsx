import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AppRoutes from './App.routes';
import Header from './components/global/Header';

import GlobalStyle from './styles/GlobalStyles';
import './styles/reset.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <RecoilRoot>
        <div className="App">
          <Header />
          <AppRoutes />
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
