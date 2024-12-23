import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">자소서지피티</Link>
      </div>
      <button className="hamburger" onClick={toggleMenu} aria-label="메뉴 열기">
        ☰
      </button>
      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/about" onClick={closeMenu} className="nav-link">
              서비스소개
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/write-intro" onClick={closeMenu} className="nav-link">
              자기소개서 쓰기
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" onClick={closeMenu} className="nav-link">
              로그인
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
