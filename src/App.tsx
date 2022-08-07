import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/global/Header';
import { Auth, TodoList } from './pages';

import GlobalStyle from './styles/GlobalStyles';
import './styles/reset.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <RecoilRoot>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
