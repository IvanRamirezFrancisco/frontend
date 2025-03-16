import React,{ CSSProperties } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
const FooterComponent = () => {
    return (
      <footer style={styles.footer}>
      <div style={styles.section}>
          <h2 style={styles.title}>Redes sociales</h2>
          <div style={styles.socialIcons}>
              <a href="#"><FaFacebook size={24} /></a>
              <a href="#"><FaInstagram size={24} /></a>
          </div>
      </div>
      <div style={styles.section}>
          <h2 style={styles.title}>Enlaces de Interés</h2>
          <ul style={styles.linkList}>
              <li style={styles.linkItem}>
                  <Link to="/politicas-privacidad" style={styles.link}>
                      Políticas de privacidad
                  </Link>
              </li>
              <li style={styles.linkItem}>
              <Link to="/" style={styles.link}>
                Preguntas frecuentes
              </Link>
            </li >
              <li style={styles.linkItem}>
                  <Link to="/terminos-condiciones" style={styles.link}>
                      Términos y condiciones
                  </Link>
            </li>
          </ul>
      </div>
      <div style={styles.section}>
          <h2 style={styles.title}>Contacto</h2>
          <p style={styles.contact}>contacto@ejemplo.com</p>
      </div>
  </footer>
    );
};

export default FooterComponent;

const styles: { [key: string]: CSSProperties } = {
  footer: {
      backgroundColor: '#000000',  
      color: '#ffffff',           
      padding: '24px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #e5e7eb',
      marginTop: '24px',
      
  },
  section: {
      marginBottom: '16px',
      textAlign: 'center',
      color: '#ffffff'            
  },
  title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#ffffff'            
  },
  linkList: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      listStyle: 'none',
      padding: 0,
      margin: 0
  },
  linkItem: {
      marginBottom: '8px',
      marginLeft: '8px',
  },
  link: {
      color: '#ffffff',           
      textDecoration: 'none',
      transition: 'color 0.2s',
      cursor: 'pointer'
  },
  linkHover: {
      color: '#4DB8FF'           
  },
  socialIcons: {
      display: 'flex',
      gap: '16px',
      color: '#ffffff'           
  },
  contact: {
      color: '#ffffff'           
  }
};

/* import React, { CSSProperties } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.section}>
        <h2 style={styles.title}>Enlaces de Interés</h2>
        <ul style={styles.linkList}>
          <li style={styles.linkItem}><a href="#" style={styles.link}>Políticas de privacidad</a></li>
          <li style={styles.linkItem}><a href="#" style={styles.link}>Términos y condiciones</a></li>
          <li style={styles.linkItem}><a href="#" style={styles.link}>Preguntas frecuentes</a></li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Redes sociales</h2>
        <div style={styles.socialIcons}>
          <a href="#"><FaFacebook size={24} color="#ffffff" /></a>
          <a href="#"><FaInstagram size={24} color="#ffffff" /></a>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Contacto</h2>
        <p style={styles.contact}>contacto@ejemplo.com</p>
      </div>
    </footer>
  );
};

const styles: { [key: string]: CSSProperties } = {
  footer: {
    backgroundColor: "#191919",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    color: "#ffffff",
    marginTop: "24px"
  },
  section: {
    marginBottom: "16px",
    textAlign: "center"
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "8px"
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  linkItem: {
    marginBottom: "8px"
  },
  link: {
    color: "#ffffff",
    textDecoration: "none"
  },
  socialIcons: {
    display: "flex",
    gap: "16px"
  },
  contact: {
    color: "#bbbbbb"
  }
};

export default Footer;
 */