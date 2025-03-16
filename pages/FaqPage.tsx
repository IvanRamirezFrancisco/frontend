import React,{ useEffect, useState } from "react";
import '../styles/FaqStyles.css'; 
import axios from "axios"; 

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

const FaqPage = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/faqs")
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleAnswer = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <h2>PREGUNTAS FRECUENTES</h2>
      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq._id} className="faq-item">
            <button
              className={`faq-question ${activeId === faq._id ? 'active' : ''}`}
              onClick={() => toggleAnswer(faq._id)}
              aria-expanded={activeId === faq._id}
            >
              <span>{faq.question}</span>
              <span className="icon">{activeId === faq._id ? '−' : '+'}</span>
            </button>

            {activeId === faq._id && (
              <div className="faq-answer" aria-hidden={!activeId}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqPage;
