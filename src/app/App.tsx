import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ChatPage from "../pages/ChatPage/ChatPage"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/room/:roomId" element={<ChatPage />}></Route>
      </Routes>
    </>
  )
}

export default App
