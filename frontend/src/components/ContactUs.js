import React from "react";
import "../css/contactUs.css";

const ContactUs =() => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! Reach out with any questions, feedback, or
          suggestions.
        </p>
      </header>

      <div className="contact-content">
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your name" required />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            required
          />

          <label htmlFor="message">Message / Suggestion</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Your message or route suggestion..."
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📧 Email: support@hyderabadnavigator.com</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📍 Address: HITEC City, Hyderabad, Telangana, India</p>
          <div className="route-suggestion-note">
            <h4>Want to Suggest a New Route?</h4>
            <p>
              If you think a bus route is missing or could be improved, let us
              know! Our team will review your suggestion and try to integrate it
              into the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
