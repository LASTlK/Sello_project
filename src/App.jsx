import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import NewsPage from './components/NewsPage'
import BrandsPage from './components/BrandsPage'
import ProductsPage from './components/ProductsPage'
import CatalogTree from './components/CatalogTree'
import PageBuilder from "./components/PageBuilder/PageBuilder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/users" element={<NewsPage />} />
        <Route path="/catalog" element={<CatalogTree />} />
        <Route path="/" element={<PageBuilder />} />
      </Routes>
    </Router>
  )
}

export default App