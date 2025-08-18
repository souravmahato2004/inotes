import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NotesState from './context/notes/NotesState';

function App() {
  return (
    <>
    <NotesState>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      </BrowserRouter>
    </NotesState>
    </>
  )
}

export default App
