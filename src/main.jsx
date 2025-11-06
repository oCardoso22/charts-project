// src/main.jsx (ou main.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Certifique-se de que o caminho para o App.jsx está correto!
// import './index.css' // Se você tiver um arquivo CSS, pode estar aqui

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);