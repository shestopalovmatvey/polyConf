import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ChatPage from "../pages/ChatPage/ChatPage"
import { ConnectPage } from "../pages/ConnectPage/ConnectPage"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import { SignUpPage } from "../pages/SignUpPage/SignUpPage"
import { useDispatch, useSelector } from "react-redux"
import { API_URL } from "../http"
import axios from "axios"
import { setUser } from "../redux/user/user.slice"
import { useState, useEffect } from "react"
import { Loader } from "../components/Loader/Loader"

function App() {
  const {user} = useSelector((store) => store)
  const dispatch = useDispatch()

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setUser(response.data.user))
    } catch (e) {
      console.log(e)
    }
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      setLoading(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<ConnectPage />}/>
        <Route path="/room/:roomId" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
      )}
    </>
  )
}

export default App
