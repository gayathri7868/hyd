// import React from 'react';
// import '../css/landing.css';
// import { useNavigate } from 'react-router-dom';

// function Landing() {
//     const Navigate = useNavigate();
//     return (
//         <div className="App">
//             <header>
//                 <nav>
//                     <div className="logo">Hyderabad Navigator</div>
//                 </nav>
//             </header>

//             <section className="hero-section">
//                 <div className="content-container">
//                     <h1>Welcome to Hyderabad Navigator</h1>
//                     <p>Discover the easiest routes to explore Hyderabad by bus</p>
//                     <a className="cta-button" onClick={() => Navigate('/index')}>Start the Journey</a>
//                 </div>
//             </section>

//             <footer>
//                 <p>© 2024 Hyderabad Navigator</p>
//             </footer>
//         </div>
//     );
// }

// export default Landing;
//Landing.js


import React from 'react';
import '../css/landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate(); // Fix: lowercase function name

    return (
        <div className="App">
            <section className="hero-section">
                <div className="content-container">
                    <h1>Welcome to HYDERABAD NAVIGATOR</h1>
                    <p>Discover the easiest routes to explore Hyderabad by bus</p>
                    <button className="cta-button" onClick={() => navigate('/index')}>
                        Explore Now
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Landing;
