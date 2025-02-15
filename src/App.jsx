import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Diaries from './pages/Diaries';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDiary from './pages/AddDiary';
import EditDiary from './pages/EditDiary';
import './App.css';
import Navbar from './components/Navbar';
import Kodepos from './pages/Kodepos';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/diaries" element={<Diaries />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diaries/add" element={<AddDiary />} />
        <Route path="/diaries/edit/:id" element={<EditDiary />} />
        <Route path="/kodepos" element={<Kodepos />} />
      </Routes>
    </Router>
  );
}

export default App;
