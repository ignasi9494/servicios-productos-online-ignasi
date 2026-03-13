import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import {LegalLayout} from './pages/LegalLayout.tsx';
import {Privacidad} from './pages/Privacidad.tsx';
import {AvisoLegal} from './pages/AvisoLegal.tsx';
import {Cookies} from './pages/Cookies.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<LegalLayout />}>
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/legal" element={<AvisoLegal />} />
          <Route path="/cookies" element={<Cookies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
