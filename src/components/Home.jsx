import { Link } from "react-router-dom";
import MainImage from "../assets/images/main.jpg";
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
              СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ
              <br />
              ИНТЕРНЕТ-МАГАЗИН ЛЕГКО И БЫСТРО
            </h1>

            {/* Абзац */}
            <p className="home-subtitle mb-4">
              Весь ваш бизнес на одной платформе. Управляйте заказами, <br />{" "}
              продавайте и доставляйте товары. <br /> Попробуйте прямо сейчас!
            </p>

            {/* Кнопка */}
            <div
              className="d-flex justify-content-center align-items-center"
            >
              <div className="d-flex" style={{ gap: "100px" }}>
                <a
                  href="/creator"
                  className="btn"
                  style={{
                    backgroundColor: "#FFA000",
                    color: "white",
                    textDecoration: "none",
                    padding: "10px 30px",
                    borderRadius: "25px",
                  }}
                >
                  Создатель
                </a>
                <a
                  href="/user"
                  className="btn"
                  style={{
                    backgroundColor: "#FFCA28",
                    color: "white",
                    textDecoration: "none",
                    padding: "10px 30px",
                    borderRadius: "25px",
                  }}
                >
                  Покупатель
                </a>
              </div>
            </div>

            {/* Фото */}
            <div className="mt-4">
              <img
                src={MainImage}
                alt="Интернет-магазин"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
