import React, { useEffect, useState } from "react";
import axios from "axios";

type Policy = {
  _id: string;
  title: string;
  description: string;
};

const PoliticasPrivacidad: React.FC = () => {
  const [dynamicPolicies, setDynamicPolicies] = useState<Policy[]>([]);
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/policies");
        setDynamicPolicies(
          response.data.sort((a: Policy, b: Policy) =>
            a.title.localeCompare(b.title)
          )
        );
      } catch (error) {
        console.error("Error obteniendo políticas:", error);
      }
    };
    fetchPolicies();
  }, []);

  const toggleAccordion = (id: string) => {
    setActivePolicyId(activePolicyId === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Políticas de Privacidad</h1>
      <p style={styles.introText}>
        Bienvenido a nuestras Políticas de Privacidad. Aquí explicamos cómo recopilamos, utilizamos y protegemos tu información personal.
      </p>
      
      {dynamicPolicies.map((policy) => (
        <div key={policy._id} style={styles.accordionItem}>
          <div style={styles.accordionHeader} onClick={() => toggleAccordion(policy._id)}>
            <h2 style={styles.accordionTitle}>{policy.title}</h2>
            <span style={styles.accordionIcon}>{activePolicyId === policy._id ? "-" : "+"}</span>
          </div>
          {activePolicyId === policy._id && (
            <div style={styles.accordionContent}>
              <p style={styles.text}>{policy.description}</p>
            </div>
          )}
        </div>
      ))}

      <h2 style={styles.subtitle}>Contacto</h2>
      <p style={styles.text}>
        Si tienes preguntas o inquietudes sobre esta política de privacidad, puedes contactarnos en <strong>contacto@ejemplo.com</strong>.
      </p>
    </div>
  );
};

export default PoliticasPrivacidad;

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "60px",
    fontFamily: "Arial, sans-serif",
    background: "#fefefe",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    marginTop: "80px",
    marginBottom: "140px",
  },
  title: {
    fontSize: "2rem",
    color: "#3277a4",
    textAlign: "center" as const,
    marginBottom: "1rem",
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
