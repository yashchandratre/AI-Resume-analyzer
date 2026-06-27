import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
