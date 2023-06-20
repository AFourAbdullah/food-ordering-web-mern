import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/img/logoo.png" className="logo-icon" />
        </div>
        <div className="footer-address">
          <p>123 Main Street, Islamabad</p>
          <p>Phone: (090) 078-601</p>
          <p>Email: info@crustandco.com</p>
        </div>
        <div className="footer-links">
          <a href="/menu">Menu</a>
          <a href="/track">Tracking</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-links">
          <a href="/blogs">Blogs</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
        <div className="footer-icons">
          <a href="#" className="icon-link">
            <FontAwesomeIcon icon={faFacebookF} className="icon" />
          </a>
          <a href="#" className="icon-link">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>
          <a href="#" className="icon-link">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
          </a>
          <a href="https://linkedin.com/company/pizzapointt" target="_blank" rel="noreferrer" className="icon-link">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
          <a href="#" className="icon-link">
            <FontAwesomeIcon icon={faYoutube} className="icon" />
          </a>
        </div>
      </div>
      <p className="footer-copy">© 2023 Crust & Co. All rights reserved.</p>
    </footer>
  );
};

export default Footer;