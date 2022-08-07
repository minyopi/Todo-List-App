import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth, TodoList } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        TEST
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
