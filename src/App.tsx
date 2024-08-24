import { useState } from 'react'
import './App.css'
import Dail from './components/dialbar/dial'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dail></Dail>
    </>
  )
}

export default App
