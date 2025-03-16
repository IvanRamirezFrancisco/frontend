import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminFaqPage.css"; 

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

const AdminFaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editAnswer, setEditAnswer] = useState<{ [key: string]: string }>({});

  const fetchFaqs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/faqs");
      setFaqs(res.data);
    } catch (error) {
      console.error("Error obteniendo FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAddFaq = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert("Por favor, llena ambos campos.");
      return;
    }
    try {
      await axios.post("http://localhost:4000/api/faqs", {
        question: newQuestion,
        answer: newAnswer,
      });
      setNewQuestion("");
      setNewAnswer("");
      fetchFaqs();
    } catch (error) {
      console.error("Error al agregar la pregunta:", error);
      alert("No se pudo agregar la pregunta.");
    }
  };

  const handleDeleteFaq = async (id: string) => {
    console.log("Eliminando ID:", id);
    try {
      await axios.delete(`http://localhost:4000/api/faqs/${id}`);
      fetchFaqs();
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
      alert("No se pudo eliminar la pregunta.");
    }
  };

  const handleEditClick = (id: string, currentAnswer: string) => {
    setEditMode({ ...editMode, [id]: true });
    setEditAnswer({ ...editAnswer, [id]: currentAnswer });
  };

  const handleUpdateFaq = async (id: string) => {
    if (!editAnswer[id]?.trim()) {
      alert("La respuesta no puede estar vacía.");
      return;
    }
    console.log("Editando ID:", id);
    try {
      await axios.put(`http://localhost:4000/api/faqs/${id}`, {
        answer: editAnswer[id],
      });
      setEditMode({ ...editMode, [id]: false });
      fetchFaqs();
    } catch (error) {
      console.error("Error al editar la pregunta:", error);
      alert("No se pudo editar la pregunta.");
    }
  };

  return (
    <div className="faq-container">
      <h2>Administrar Preguntas Frecuentes</h2>
      <div className="faq-form">
        <input
          className="faq-input"
          placeholder="Pregunta"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          className="faq-input"
          placeholder="Respuesta"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button className="faq-button" onClick={handleAddFaq}>Agregar</button>
      </div>
      <ul className="faq-list">
        {faqs.map((faq) => (
          <li key={faq._id} className="faq-item">
            <strong>{faq.question}</strong>
            {editMode[faq._id] ? (
              <>
                <input
                  className="faq-input"
                  type="text"
                  value={editAnswer[faq._id]}
                  onChange={(e) => setEditAnswer({ ...editAnswer, [faq._id]: e.target.value })}
                />
                <button className="faq-button save" onClick={() => handleUpdateFaq(faq._id)}>Guardar</button>
                <button className="faq-button cancel" onClick={() => setEditMode({ ...editMode, [faq._id]: false })}>Cancelar</button>
              </>
            ) : (
              <>
                <p>{faq.answer}</p>
                <button className="faq-button edit" onClick={() => handleEditClick(faq._id, faq.answer)}>Editar</button>
                <button className="faq-button delete" onClick={() => handleDeleteFaq(faq._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFaqPage;
