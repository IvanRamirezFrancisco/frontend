// frontend/terminosycondiciones.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Term {
  _id: string;
  title: string;
  description: string;
}

const TerminosCondiciones: React.FC = () => {
  const [dynamicTerms, setDynamicTerms] = useState<Term[]>([]);
  const [activeTermId, setActiveTermId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/terms");
        // Ordena los términos alfabéticamente por título
        setDynamicTerms(response.data.sort((a: Term, b: Term) => a.title.localeCompare(b.title)));
      } catch (error) {
        console.error("Error obteniendo términos:", error);
      }
    };
    fetchTerms();
  }, []);

  const toggleAccordion = (id: string) => {
    setActiveTermId(activeTermId === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Términos y Condiciones</h1>
      <p style={styles.introText}>
        Bienvenido a los Términos y Condiciones de Baby Dreams. Estos términos describen las reglas y
        regulaciones para el uso de nuestro sitio web y servicios. Al acceder y navegar en nuestro sitio,
        aceptas cumplir con todos los términos establecidos aquí.
      </p>

      {/* Acordeón de términos */}
      {dynamicTerms.map((term) => (
        <div key={term._id} style={styles.accordionItem}>
          <div style={styles.accordionHeader} onClick={() => toggleAccordion(term._id)}>
            <h2 style={styles.accordionTitle}>{term.title}</h2>
            <span style={styles.accordionIcon}>{activeTermId === term._id ? "-" : "+"}</span>
          </div>
          {activeTermId === term._id && (
            <div style={styles.accordionContent}>
              <p style={styles.text}>{term.description}</p>
            </div>
          )}
        </div>
      ))}

      <h2 style={styles.subtitle}>Contacto</h2>
      <p style={styles.text}>
        Si tienes preguntas o inquietudes acerca de estos Términos y Condiciones, puedes contactarnos en{" "}
        <strong>contacto@ejemplo.com</strong>.
      </p>
    </div>
  );
};

export default TerminosCondiciones;

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    background: "#fefefe",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    marginTop: "90px",
    marginBottom: "100px",
  },
  title: {
    fontSize: "2.2rem",
    color: "#3277a4",
    textAlign: "center" as const,
    marginBottom: "1.5rem",
  },
  introText: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#666",
    marginBottom: "2rem",
  },
  accordionItem: {
    borderBottom: "1px solid #ddd",
    marginBottom: "10px",
  },
  accordionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px 0",
  },
  accordionTitle: {
    fontSize: "1.3rem",
    color: "#2c3e50",
    margin: 0,
  },
  accordionIcon: {
    fontSize: "1.5rem",
    color: "#3277a4",
    padding: "0 10px",
  },
  accordionContent: {
    padding: "10px 0",
    animation: "fadeIn 0.3s ease-in-out",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginTop: "20px",
    marginBottom: "0.5rem",
    color: "#333",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#666",
    marginBottom: "1rem",
  },
};
