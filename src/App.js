import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;