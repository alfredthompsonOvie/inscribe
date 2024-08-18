import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import 'bulma/css/bulma.min.css'; 
// import './assets/styles/reset.css';
// import "./assets/styles/normalize.css"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
