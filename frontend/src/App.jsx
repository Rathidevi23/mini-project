import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Approutes from './routes/Approutes'
import Header from './components/Header'
import { TripProvider } from './hook/Trip'


function App() {
  return (
   <BrowserRouter>
   <TripProvider>
    <div className='App'>
      <Header/>
      <Approutes/>
    </div>
   </TripProvider>
   </BrowserRouter>
  )
}

export default App

