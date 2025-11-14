import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import NewsPage from './components/NewsPage'
import BrandsPage from './components/BrandsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/products" element={<NewsPage />} />
        <Route path="/users" element={<NewsPage />} />
        <Route path="/catalog" element={<NewsPage />} />
      </Routes>
    </Router>
  )
}

export default App