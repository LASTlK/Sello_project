import { Link } from "react-router-dom"
import MainImage from "../assets/images/main.jpg"
import Header from "./Header";

const Home = () => {
  return (
    <div className="home-container">
      {/* Навигационная панель */}
      <Header />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            
            {/* Главный текст */}
            <h1 className="home-title mt-5">
              СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ<br />ИНТЕРНЕТ-МАГАЗИН ЛЕГКО И БЫСТРО
            </h1>

            {/* Абзац */}
            <p className="home-subtitle mb-4">
              Весь ваш бизнес на одной платформе. Управляйте заказами, <br /> продавайте и доставляйте товары. <br /> Попробуйте прямо сейчас!
            </p>

            {/* Кнопка */}
            <div>
              <Link
                to="/register"
                className="btn btn-primary fw-semibold d-inline-flex align-items-center justify-content-center"
                style={{ 
                  width: '250px', 
                  height: '45px',
                  fontSize: '18px'
                }}
              >
                НАЧАТЬ
              </Link>
            </div>

            {/* Фото */}
            <div className="mt-4">
              <img
                src={MainImage}
                alt="Интернет-магазин"
                className="img-fluid rounded shadow"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home