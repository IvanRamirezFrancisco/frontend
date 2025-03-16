import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPoliPage.css";

type PolicyItem = {
  _id: string;
  title: string;
  description: string;
};



const AdminPoliPage: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editDescription, setEditDescription] = useState<{ [key: string]: string }>({});
  const [editTitle, setEditTitle] = useState<{ [key: string]: string }>({});
  // Obtener políticas con ordenamiento
  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/policies");
      setPolicies(res.data);
    } catch (error) {
      console.error("Error obteniendo políticas:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleAddPolicy = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Por favor, llena ambos campos.");
      return;
    }
    
    

    try {
      const response = await axios.post("http://localhost:4000/api/policies", {
        title: newTitle,
        description: newDescription,
      });

      setPolicies(prev => [
        ...prev, 
        { 
          _id: response.data._id, 
          title: newTitle, 
          description: newDescription 
        }
      ]);
      
      setNewTitle("");
      setNewDescription("");
      
      await new Promise(resolve => setTimeout(resolve, 50));
      setTimeout(() => {
        const lastItem = document.querySelector('.policy-item:last-child');
        lastItem?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } 
    catch (error) {
      let errorMessage = "Error al comunicarse con el servidor";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    alert(`Error: ${errorMessage}`);
  }
  };

  const handleDeletePolicy = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/policies/${id}`);
      setPolicies(prev => prev.filter(policy => policy._id !== id));
    } catch (error) {
      let errorMessage = "Error al agregarse";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    alert(`Error: ${errorMessage}`);
  }
  };

  const handleUpdatePolicy = async (id: string) => {
    if (!editTitle[id]?.trim() || !editDescription[id]?.trim()) {
      alert("Ambos campos son obligatorios");
      return;
    }
    
    try {
      await axios.put(`http://localhost:4000/api/policies/${id}`, {
        title: editTitle[id],
        description: editDescription[id],
      });
      
      setPolicies(prev => 
        prev.map(policy => 
          policy._id === id ? { 
            ...policy, 
            title: editTitle[id], 
            description: editDescription[id] 
          } : policy
        )
      );
      
      setEditMode(prev => ({ ...prev, [id]: false }));
    } catch (error: unknown) {
      let errorMessage = "Error al editar";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      alert(`Error: ${errorMessage}`);
    }
  };
  


  const handleEditClick = (
    id: string, 
    currentTitle: string, 
    currentDescription: string
  ) => {
    setEditMode(prev => ({...prev, [id]: true}));
    setEditTitle(prev => ({...prev, [id]: currentTitle}));
    setEditDescription(prev => ({...prev, [id]: currentDescription}));
  };

  return (
    <div className="policy-container">
      <h2>Administrar Políticas</h2>

      <div className="policy-form">
      <div className="input-group">
          <label>Título de la política</label>
          <input
            className="policy-input"
            placeholder="Ej: Política de privacidad"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={50}
          />
          <span className="char-counter">{newTitle.length}/50</span>
        </div>
        
        <div className="input-group">
          <label>Descripción</label>
          <textarea
            className="policy-input policy-textarea"
            placeholder="Describe los detalles de la política"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            maxLength={500}
          />
          <span className="char-counter">{newDescription.length}/500</span>
        </div>
        
        
        <div className="form-footer">
          <div className="policy-counter">
            <span>CREADAS:{policies.length}</span>
          </div>
          <button className="policy-button add" onClick={handleAddPolicy}>
            <span>➕</span> Agregar Política
          </button>
        </div>
      </div>

      <ul className="policy-list">
      {policies.map((policy) => (
      <li key={policy._id || Math.random().toString()} className="policy-item">

            <div className="policy-content">
              {/* Sección de edición mejorada */}
              {editMode[policy._id] ? (
                <div className="edit-mode">
                  <div className="input-group">
                    <label>Título</label>
                    <input
                      className="policy-input"
                      value={editTitle[policy._id]}
                      onChange={(e) => setEditTitle(prev => ({
                        ...prev,
                        [policy._id]: e.target.value
                      }))}
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Descripción</label>
                    <textarea
                      className="policy-input policy-textarea"
                      value={editDescription[policy._id]}
                      onChange={(e) => setEditDescription(prev => ({
                        ...prev,
                        [policy._id]: e.target.value
                      }))}
                    />
                  </div>
                  
                  <div className="action-buttons">
                    <button className="policy-button save" onClick={() => handleUpdatePolicy(policy._id)}>
                      💾 Guardar
                    </button>
                    <button className="policy-button cancel" onClick={() => setEditMode(prev => ({ ...prev, [policy._id]: false }))}>
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <h3 className="policy-title">{policy.title}</h3>
                  <p className="policy-description">{policy.description}</p>
                  <div className="action-buttons">
                    <button 
                      className="policy-button edit" 
                      onClick={() => handleEditClick(policy._id, policy.title, policy.description)}
                    >
                      ✏️ Editar
                    </button>
                    <button className="policy-button delete" onClick={() => handleDeletePolicy(policy._id)}>
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

export default AdminPoliPage;