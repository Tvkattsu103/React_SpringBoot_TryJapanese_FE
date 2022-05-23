import './App.css';
import Dashboard from './components/Admin';
import AllWord from './components/Admin/Manage/AllWord';
import AddVocab from './components/Admin/Manage/AddVocab';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Words from './components/Body/Words'
import Vocab from './components/Body/Vocab';
import Quiz from './components/Body/Quiz';
import Complete from './components/Body/Complete';
import AllVocab from './components/Admin/Manage/AllVocab';
import Login from './components/User/Login';
import Register from './components/User/Register';
import AllUser from './components/Admin/Manage/AllUser';
import AllTopic from './components/Admin/Manage/AllTopic';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Words />} />
          <Route path="/vocab/:id" element={<Vocab />} />
          <Route path="/vocab/:id/quiz" element={<Quiz />} />
          <Route path="/vocab/:id/complete" element={<Complete />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/listword" element={<AllWord />} />
          <Route path="/admin/listuser" element={<AllUser />} />
          <Route path="/admin/listtopic" element={<AllTopic />} />
          <Route path="/admin/listword/vocabs/:id" element={<AllVocab />} />
          <Route path="/admin/listword/vocabs/:id/add" element={<AddVocab />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
