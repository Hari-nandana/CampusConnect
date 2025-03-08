import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NextPage from "./NextPage";
import Rupload from "./rupload";
import ResourcePage from "./ResourcePage"; 
import ClassesPage from "./ClassesPage"; 
import Rfaculty from "./rfaculty"; 
import Class from "./Class"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/rupload" element={<Rupload />} />
        <Route path="/resources/:subject" element={<ResourcePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/rfaculty/:className" element={<Rfaculty />} />
        <Route path="/class/:className" element={<Class />} />
      </Routes>
    </Router>
  );
}

export default App;
