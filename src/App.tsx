import './App.css'
import { Routes, Route } from 'react-router-dom'
import CanvasPage from './pages/Holst/CanvasPage';
import { Face } from './pages/Face/Face'
import { TheProject } from './pages/TheProject/TheProject'
import { Home } from './pages/Home/Home'
import { ReactFlowProvider } from 'reactflow';
import Diagram from './pages/Diagram/ProjectDiagramPage';
import { Dors } from './pages/Dors/Dors';

function App() {
  return (
    <>
    <ReactFlowProvider>
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<Face />} />
          <Route path='/project' element={<TheProject />} />
          <Route path='/Dors' element={<Dors />} />
          <Route path='/home' element={<Home />} />
          <Route path='/project/:id/canvas' element={<CanvasPage />} />
          <Route path="/project/:id/diagram" element={<Diagram />} />
        </Routes>
      </main>
    </ReactFlowProvider>
    </>
  )
}

export default App
