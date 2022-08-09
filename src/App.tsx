import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/global/Header';
import { Auth, TodoList, TodoListDetail } from './pages';

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
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<TodoList />} />
            <Route path="/detail/:id" element={<TodoListDetail />} />
          </Routes>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
