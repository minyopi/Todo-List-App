import AppRoutes from './App.routes';
import Header from './components/global/Header';

import './styles/reset.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
