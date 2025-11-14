import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

{/* Импортируем иконки */}
import HomeIcon from "../assets/icon/home-icon.svg";
import NewsIcon from "../assets/icon/news-icon.svg";
import BrandsIcon from "../assets/icon/brands-icon.svg";
import ProductsIcon from "../assets/icon/products-icon.svg";
import UsersIcon from "../assets/icon/users-icon.svg";
import CatalogIcon from "../assets/icon/catalog-icon.svg";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Главная страница", icon: HomeIcon },
    { path: "/news", label: "Новости", icon: NewsIcon },
    { path: "/brands", label: "Бренды", icon: BrandsIcon },
    { path: "/products", label: "Товары", icon: ProductsIcon },
    { path: "/users", label: "Пользователи", icon: UsersIcon },
    { path: "/catalog", label: "Дерево каталога", icon: CatalogIcon },
  ];

  return (
    <div 
      className={`sidebar-custom position-fixed ${isExpanded ? 'expanded' : 'collapsed'} transition-all`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-content h-100 d-flex flex-column mt-2">
        
        {/* Пункты меню */}
        <div className="sidebar-menu-items flex-grow-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link d-flex align-items-center text-decoration-none rounded ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <img 
                src={item.icon} 
                alt={item.label}
                className="sidebar-icon"
                style={{ width: '29px', height: '28px' }}
              />
              {isExpanded && (
                <span className="sidebar-label ms-3 fw-normal">{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;