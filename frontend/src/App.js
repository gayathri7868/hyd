import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Screen from './components/Screen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discover from './components/Discover';
import Explore from './components/Explore';
import Landing from './components/Landing';
import Tourist from './components/Tourist';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<><Landing /></>} />
        <Route path="/index" element={<><Navbar /><Screen /></>} />
        <Route path="/find-routes" element={<><Navbar /><Discover /></>} />
        <Route path="/find-stop" element={<><Navbar /><Explore /></>} />
        <Route path="/find-tourist" element={<><Navbar /><Tourist /></>} />
      </Routes>
    </Router>
  );
}

export default App;
