import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/App.css';
import Navbar from './components/Navbar';
import Screen from './components/Screen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discover from './components/Discover';
import Explore from './components/Explore';
import Landing from './components/Landing';
import Tourist from './components/Tourist';
import SpecificSpot from './components/SpecificSpot';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';



function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<><Landing /></>} />
        <Route path="/index" element={<><Navbar /><Screen /></>} />
        <Route path="/find-routes" element={<><Navbar /><Discover /></>} />
        <Route path="/find-stop" element={<><Navbar /><Explore /></>} />
        <Route path="/find-tourist" element={<><Navbar /><Tourist /></>} />
        <Route path="/SpecificSpot" element={<><Navbar /><SpecificSpot /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /></>} />
        <Route path="/contact-us" element={<><Navbar /><ContactUs /></>} />
        
      </Routes>
    </Router>
  );
}

export default App;
