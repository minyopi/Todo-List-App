import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/GlobalStyles';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);
