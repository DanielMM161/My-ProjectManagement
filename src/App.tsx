import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import './App.css';
import AppContent from './AppContent';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AppContent />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
