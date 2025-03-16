// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FaqPage from '../pages/FaqPage';
import PoliticasPrivacidad from '../politicas/politicasprivacidad';
import TerminosCondiciones from '../politicas/terminosycondiciones';
import AdminFaqPage from "../pages/AdminFaqPage";
import AdminPoliPage from "../politicas/Adminpoli"
import AdminTerms from "../politicas/AdminTerms";
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        
        <Route path="/" element={<FaqPage />} />

        <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />

        <Route path='/terminos-condiciones'  element={< TerminosCondiciones/>} />

        <Route path="/AdminFaqPage" element={<AdminFaqPage />} />

        <Route path="/adminPoliPage" element={<AdminPoliPage />} />

        <Route path="/admin/terms" element={<AdminTerms />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
