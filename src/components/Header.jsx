import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SelloLogo from "../assets/images/sello-logo.svg";

const Header = () => {
  const [userName, setUserName] = useState("");

  return (
    <header className="navbar-custom shadow-sm" style={{ height: '56px' }}>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm navbar-custom h-100">
        <div className="container h-100">
          {/* Логотип */}
          <Link className="navbar-brand d-flex align-items-center h-100 ps-3" to="/">
            <img src={SelloLogo} alt="Sello Logo" style={{ height: "40px" }} />
          </Link>

          {/* Ссылки авторизации */}
          <div className="d-flex align-items-center h-100">
            <Link to="/login" className="text-dark text-decoration-none me-2">
              Вход
            </Link>
            <span className="text-dark mx-1">/</span>
            <Link
              to="/register"
              className="text-dark text-decoration-none ms-2"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;