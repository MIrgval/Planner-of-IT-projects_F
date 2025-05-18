import './App.css'
import { Routes, Route } from 'react-router-dom'

import { Face } from './pages/Face/Face'
import { TheProject } from './pages/TheProject/TheProject'
import { Home } from './pages/Home/Home'

function App() {
  return (
    <>
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<Face />} />
          <Route path='/project' element={<TheProject />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
