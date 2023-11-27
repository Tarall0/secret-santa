import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Santa from './components/Santa'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Header/>
      <Santa/>
      <Footer/>
    </>
  )
}

export default App
