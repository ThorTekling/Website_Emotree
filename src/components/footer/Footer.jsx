import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Explore</h2>
            <span>Home</span>
            <span>Journal</span>
            <span>Articles</span>
            <span>Emotion Tree</span>
            <span>Monthly Report</span>
            <span>Advice</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Our Mission</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
            <span>FAQs</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help Center</span>
            <span>Community Support</span>
            <span>Technical Issues</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Testimonials</span>
            <span>Forum</span>
            <span>Blog</span>
            <span>Events</span>
            <span>Invite a Friend</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>EmotiTree</h2> {/* Updated brand name to reflect the emotion-tree theme */}
            <span>© EmotiTree 2024</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="Twitter" />
              <img src="/img/facebook.png" alt="Facebook" />
              <img src="/img/linkedin.png" alt="LinkedIn" />
              <img src="/img/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="Language" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="Currency" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
