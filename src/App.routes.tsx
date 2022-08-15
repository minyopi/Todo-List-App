import { Route, Routes } from 'react-router-dom';
import { Auth, Login, SignUp, TodoList, TodoListDetail } from './pages';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signUp" element={<SignUp />} />
      <Route path="/detail/:id" element={<TodoListDetail />} />
    </Routes>
  );
};

export default AppRoutes;
