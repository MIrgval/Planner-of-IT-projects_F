import './App.css'
import { MyHeader } from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'

import { Main } from './pages/Main/Main'
import { Project } from './pages/Project/Project'

function App() {
  return (
    <>
      <MyHeader />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/project' element={<Project />} />
        </Routes>
      </main>
    </>
  )
}

export default App
