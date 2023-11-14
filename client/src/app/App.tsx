import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ChatPage from "../pages/ChatPage/ChatPage"
import { ConnectPage } from "../pages/ConnectPage/ConnectPage"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import { SignUpPage } from "../pages/SignUpPage/SignUpPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<ConnectPage />}/>
        <Route path="/room/:roomId" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
