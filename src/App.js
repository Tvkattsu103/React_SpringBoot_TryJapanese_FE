import './App.css';
import NavbarComp from './components/NavBarComp';
import Dashboard from './components/Admin';
import AllWord from './components/Admin/Manage/AllWord';
import AddWord from './components/Admin/Manage/AddWord';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Words from './components/Body/Words'
// import Test from './components/Body/Test'
import Vocab from './components/Body/Vocab';
import Quiz from './components/Body/Quiz';
import Complete from './components/Body/Complete';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
