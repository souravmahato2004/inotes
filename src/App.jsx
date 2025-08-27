import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NotesState from './context/notes/NotesState';
import Signup from './components/Signup';
import Login from './components/Login';
import { AlertProvider } from './context/Alert/AlertContext';

function App() {
  return (
    <>
    <NotesState>
      <AlertProvider>
        <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        </div>
      </BrowserRouter>
      </AlertProvider>
    </NotesState>
    </>
  )
}

export default App
