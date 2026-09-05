import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">

                {/* Brand */}
                <div className="footer-brand">
                    <h2 className="footer-logo">EL<span>Mare</span></h2>
                    <p>A luxury retreat on the shores of Potam Beach, Himarë. Where the Albanian Riviera meets refined hospitality.</p>
                    <div className="footer-socials">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                    </div>
                </div>

                {/* Links */}
                <div className="footer-col">
                    <span className="footer-col-title">Navigation</span>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/rooms">Rooms</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    <span className="footer-col-title">Contact</span>
                    <ul>
                        <li>Potam Beach, Himarë, Albania</li>
                        <li><a href="tel:+355691234567">+355 69 123 4567</a></li>
                        <li><a href="mailto:info@elmare.al">info@elmare.al</a></li>
                        <li>Reception open 24/7</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} ELMare Hotel. All rights reserved.</span>
                <span>Potam, Himarë — Albania</span>
            </div>
        </footer>
    );
};

export default Footer;