import React from "react";
import "../styles/Header.css";

const Header: React.FC = () => {
  const newLocal = <img src="../styles/iconos2_0.jpg" className="logo" />;
  return (
    <header className="header">
      <div className="logo-container">
        {newLocal}
        <h1 className="title">Baby Dreams</h1>
      </div>

      <nav className="nav">
        <a href="/" className="nav-link">Inicio</a>
        <a href="/about" className="nav-link">Conócenos</a>
        <a href="/contact" className="nav-link">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
