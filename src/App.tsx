import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
