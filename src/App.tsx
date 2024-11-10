import Home from './components/home/home'
import Room from './components/room/Room'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
      <Routes>
        <Route path='/letsConnect' element={<Home />}/>
        <Route path='/room/:id/:byJoin' element={<Room />}/>
      </Routes>
  )
}

export default App
