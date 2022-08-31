import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/:pageNumber" element={<App />} />
      <Route path="/" element={<Navigate to="/1" replace={true} />} />
    </Routes>
  </BrowserRouter>
)
