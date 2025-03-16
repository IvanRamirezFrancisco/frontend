// frontend/AdminTerms.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminTermsPage.css";

interface TermItem {
  _id: string;
  title: string;
  description: string;
}

const AdminTerms: React.FC = () => {
  const [terms, setTerms] = useState<TermItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editTitle, setEditTitle] = useState<{ [key: string]: string }>({});
  const [editDescription, setEditDescription] = useState<{ [key: string]: string }>({});

  const fetchTerms = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/terms");
      setTerms(res.data);
    } catch (error) {
      console.error("Error obteniendo términos:", error);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleAddTerm = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Por favor, llena ambos campos.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/terms", {
        title: newTitle,
        description: newDescription,
      });
      setTerms(prev => [
        ...prev,
        { _id: response.data.data ? response.data.data._id : response.data._id, title: newTitle, description: newDescription },
      ]);
      setNewTitle("");
      setNewDescription("");
      await new Promise(resolve => setTimeout(resolve, 50));
      setTimeout(() => {
        const lastItem = document.querySelector('.term-item:last-child');
        lastItem?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al comunicarse con el servidor";
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleDeleteTerm = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/terms/${id}`);
      setTerms(prev => prev.filter(term => term._id !== id));
    } catch (error: any) {
      console.error("Error al eliminar:", error.response?.data);
      alert(`Error: ${error.response?.data?.message || "Error al eliminar"}`);
    }
  };

  const handleUpdateTerm = async (id: string) => {
    if (!editTitle[id]?.trim() || !editDescription[id]?.trim()) {
      alert("Ambos campos son obligatorios");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:4000/api/terms/${id}`, {
        title: editTitle[id],
        description: editDescription[id],
      });
      setTerms(prev =>
        prev.map(term =>
          term._id === id ? { ...term, title: editTitle[id], description: editDescription[id] } : term
        )
      );
      setEditMode(prev => ({ ...prev, [id]: false }));
    } catch (error: any) {
      console.error("Error al actualizar:", error.response?.data);
      alert(`Error: ${error.response?.data?.message || "Error al editar"}`);
    }
  };

  const handleEditClick = (id: string, currentTitle: string, currentDescription: string) => {
    setEditMode(prev => ({ ...prev, [id]: true }));
    setEditTitle(prev => ({ ...prev, [id]: currentTitle }));
    setEditDescription(prev => ({ ...prev, [id]: currentDescription }));
  };

  

  return (
    <div className="term-container">
      <h2>Administrar Términos y Condiciones</h2>
      <div className="term-form">
        <div className="input-group">
          <label>Título del Término</label>
          <input
            className="term-input"
            placeholder="Ej: Uso del Sitio"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            maxLength={50}
          />
          <span className="char-counter">{newTitle.length}/50</span>
        </div>
        <div className="input-group">
          <label>Descripción</label>
          <textarea
            className="term-input term-textarea"
            placeholder="Describe el término"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            maxLength={500}
          />
          <span className="char-counter">{newDescription.length}/500</span>
        </div>
        <div className="form-footer">
          <div className="term-counter">
            <span>CREADOS: {terms.length}</span>
          </div>
          <button className="term-button add" onClick={handleAddTerm}>
            <span>➕</span> Agregar Término
          </button>
        </div>
      </div>
      <ul className="term-list">
        {terms.map(term => (
          <li key={term._id} className="term-item">
            <div className="term-content">
              {editMode[term._id] ? (
                <div className="edit-mode">
                  <div className="input-group">
                    <label>Título</label>
                    <input
                      className="term-input"
                      value={editTitle[term._id]}
                      onChange={e => setEditTitle(prev => ({ ...prev, [term._id]: e.target.value }))}
                    />
                  </div>
                  <div className="input-group">
                    <label>Descripción</label>
                    <textarea
                      className="term-input term-textarea"
                      value={editDescription[term._id]}
                      onChange={e => setEditDescription(prev => ({ ...prev, [term._id]: e.target.value }))}
                    />
                  </div>
                  <div className="action-buttons">
                    <button className="term-button save" onClick={() => handleUpdateTerm(term._id)}>
                      💾 Guardar
                    </button>
                    <button className="term-button cancel" onClick={() => setEditMode(prev => ({ ...prev, [term._id]: false }))}>
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <h3 className="term-title">{term.title}</h3>
                  <p className="term-description">{term.description}</p>
                  <div className="action-buttons">
                    <button className="term-button edit" onClick={() => handleEditClick(term._id, term.title, term.description)}>
                      ✏️ Editar
                    </button>
                    <button className="term-button delete" onClick={() => handleDeleteTerm(term._id)}>
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTerms;
