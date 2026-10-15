import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Admin", to: "/admin/login" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`elmare-nav${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="elmare-logo">
          <span className="ornament" />
          EL<span className="accent">Mare</span>
          <span className="ornament" />
        </Link>

        <ul className="elmare-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="lang-flags">
            {/* <img
              src="https://flagcdn.com/al.svg"
              alt="Shqip"
              title="Shqip"
              className={activeLang === "al" ? "active" : ""}
              onClick={() => setActiveLang("al")}
            /> */}
            <img
              src="https://flagcdn.com/gb.svg"
              alt="English"
              title="English"
              className={activeLang === "en" ? "active" : ""}
              onClick={() => setActiveLang("en")}
            />
          </div>

          <Link to="/booking" className="btn-book">Book Now</Link>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>Book Now</Link>
          </li>
        </ul>
      </div>
    </>
  );
}