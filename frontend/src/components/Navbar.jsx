import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
      </div>

      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Classic Quiz</Link></li>
        <li><Link to="/malow" onClick={() => setIsOpen(false)}>Modern Quiz</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;