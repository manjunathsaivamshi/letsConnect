import Home from './components/home/home'
import Room from './components/room/Room'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/room/:id' element={<Room />}/>
      </Routes>
  )
}

export default App
