
import React from "react";
import "../css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <header >
        <h2>Discover Hyderabad with Ease</h2>
        <p>Your trusted companion for seamless city navigation.</p>
      </header>

      <section className="content-section">
        <h2>Our Mission</h2>
        <p>
          At <strong>Hyderabad Navigator</strong>, we aim to simplify public transportation for both locals and tourists. 
          We provide accurate, real-time bus routes, schedules, and travel guidance to make city commuting hassle-free.
        </p>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🗺 Comprehensive Bus Routes</h3>
            <p>Find the most efficient bus routes and plan your journey in seconds.</p>
          </div>
          <div className="feature-card">
            <h3>📍 Stop-by-Stop Information</h3>
            <p>Get details about each bus stop, including nearby landmarks and transfer points.</p>
          </div>
          <div className="feature-card">
            <h3>🚌 Trip Planner</h3>
            <p>Personalized itineraries to help you navigate Hyderabad with ease.</p>
          </div>
          <div className="feature-card">
            <h3>🏛 Tourist Spot Guide</h3>
            <p>Explore Hyderabad’s top attractions and find the best bus routes to reach them.</p>
          </div>
        </div>
      </section>

      <section className="commitment-section">
        <h2>Our Commitment</h2>
        <p>
          We are dedicated to continuously enhancing our platform, ensuring up-to-date transit information.
          Your feedback helps us evolve, making Hyderabad Navigator even more efficient and reliable.
        </p>
      </section>

      <footer className="footer">
        <p>🌍 Navigating Hyderabad, one bus at a time!</p>
      </footer>
    </div>
  );
};

export default AboutUs;

