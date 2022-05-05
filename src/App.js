import './App.css';
import Dashboard from './components/Admin';
import AllWord from './components/Admin/Manage/AllWord';
import AddVocab from './components/Admin/Manage/AddVocab';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Words from './components/Body/Words'
import Vocab from './components/Body/Vocab';
import Quiz from './components/Body/Quiz';
import Complete from './components/Body/Complete';
import AllVocab from './components/Admin/Manage/AllVocab';

function App() {
  // window.onbeforeunload = (event) => {
  //   const e = event || window.event;
  //   e.preventDefault();
  //   if (e) {
  //     e.returnValue = "";
  //   }
  //   return "";
  // };
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
          <Route path="/admin/listword/vocabs/:id" element={<AllVocab />} />
          <Route path="/admin/listword/vocabs/:id/add" element={<AddVocab />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
