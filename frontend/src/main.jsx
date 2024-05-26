import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowComponent from './components/ShowComponent.jsx';

export default function IndexDom() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/show' element={<ShowComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<IndexDom />)  
