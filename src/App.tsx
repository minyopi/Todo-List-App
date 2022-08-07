import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/global/Header';
import { Auth, TodoList } from './pages';
import './styles/reset.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
