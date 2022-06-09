import Computing from "./pages/Computing";
import NonComputing from "./pages/NonComputing";
import './App.css';
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Computing />} />
            <Route path="/computing" element={<Computing />} />
            <Route path="/non_computing" element={<NonComputing />} />
        </Routes>
    </Router>
  );
}


export default App;
