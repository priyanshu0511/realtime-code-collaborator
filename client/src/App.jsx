import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import EditorPage from "./pages/EditorPage"
import { ToastContainer } from "react-toastify"

function App() {
  
  return (
    <div className="h-screen bg-darkBg">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
