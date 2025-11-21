import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import NewsIcon from "../assets/icon/news-icon.svg";
import EditIcon from "../assets/icon/edit-icon.svg";
import PlusIcon from "../assets/icon/plus-icon-brown.svg";
import DeleteWhiteIcon from "../assets/icon/delete-white-icon.svg";
import PlusImageIcon from "../assets/icon/plus-image-icon.svg";
import NewsImage from "../assets/images/news1.jpg";

const NewsPage = () => {
  const [userName, setUserName] = useState("");
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
  });

  {
    /* Состояние для хранения списка новостей */
  }
  const [newsList, setNewsList] = useState([]);

  {
    /* Обработчики изменений формы */
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  {
    /* Обработчик отправки формы (добавление/редактирование) */
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNews) {
      {
        /* Редактирование */
      }
      setNewsList(
        newsList.map((news) =>
          news.id === editingNews.id ? { ...news, ...formData } : news
        )
      );
      setEditingNews(null);
    } else {
      {
        /* Добавление */
      }
      const newNews = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString(),
      };
      setNewsList([...newsList, newNews]);
    }

    {
      /* Очистка формы */
    }
    setFormData({
      title: "",
      content: "",
      image: null,
      category: "",
    });
    setIsAddingNews(false);
  };

  {
    /* Обработчик удаления новости */
  }
  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
    setEditingNews(null); {/* Сбрасываем editingNews */}
    {/* Сбрасываем formData в пустые значения */}
    setFormData({
      title: "",
      content: "",
      image: null,
      category: "",
    });
    setIsAddingNews(false); {/* После удаления возвращаемся к списку */}
  };

  {
    /* Обработчик редактирования новости */
  }
  const handleEditNews = (news) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      image: news.image || null,
      category: news.category || "",
    });
    setIsAddingNews(true);
  };

  {
    /* Если в режиме добавления/редактирования — показываем форму */
  }
  if (isAddingNews) {
    return (
      <div className="news-page-container">
        <Header />
        <div className="main-content-wrapper">
          <Sidebar />
          <main className="news-content-main">
            <div className="container-fluid p-4">
              {/* Заголовок страницы */}
              <div className="d-flex align-items-center justify-content-center mb-4">
                <img
                  src={NewsIcon}
                  alt="Новости"
                  className="news-title-icon me-3"
                  style={{ width: "29px", height: "28px" }}
                />
                <h1 className="news-main-title fw-normal">НОВОСТИ</h1>
              </div>

              {/* Подзаголовок формы */}
              <h3 className="brands-subtitle mb-4 ms-4">
                {editingNews ? "Редактировать новость" : "Добавить новость"}
              </h3>

              {/* Форма добавления/редактирования */}
              <form
                onSubmit={handleSubmit}
                className="brands-form"
                style={{ backgroundColor: "#FFF4E5" }}
              >
                <div className="row g-4 mb-4">
                  <div className="col-md-8">
                    <label
                      htmlFor="newsTitle"
                      className="form-label text-medium-brown"
                    >
                      {editingNews
                        ? "Изменить заголовок новости"
                        : "Заголовок новости"}
                    </label>
                    <input
                      type="text"
                      id="newsTitle"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Введите..."
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="newsCategory"
                      className="form-label text-medium-brown"
                    >
                      Категория:
                    </label>
                    <select
                      id="newsCategory"
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Выберите
                      </option>
                      <option value="general">Общие</option>
                      <option value="updates">Обновления</option>
                      <option value="promotions">Акции</option>
                      <option value="tech">Технологии</option>
                    </select>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <label
                      htmlFor="newsImage"
                      className="form-label text-medium-brown"
                    >
                      {editingNews
                        ? "Изменить изображение:"
                        : "Добавить изображение:"}
                    </label>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn d-flex align-items-center"
                        style={{
                          backgroundColor: "#FFECB3",
                          color: "#FFA000",
                          borderRadius: "18px",
                          padding: "8px 18px",
                        }}
                        onClick={() =>
                          document.getElementById("newsImageInput").click()
                        }
                      >
                        <img
                          src={PlusImageIcon}
                          alt="Плюс"
                          className="me-2"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Прикрепить изображение
                      </button>
                      <input
                        id="newsImageInput"
                        type="file"
                        accept="image/*"
                        className="brands-file-input"
                        onChange={handleFileChange}
                      />
                      <span className="text-muted">
                        {formData.image
                          ? formData.image.name
                          : "Медиафайлы не выбраны"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <label
                      htmlFor="newsDescription"
                      className="form-label text-medium-brown"
                    >
                      {editingNews ? "Изменить описание:" : "Описание:"}
                    </label>
                    <textarea
                      id="newsDescription"
                      className="form-control"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Введите описание..."
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Кнопки внизу формы */}
                <div className="mt-4">
                  {editingNews ? (
                    // Режим редактирования: две кнопки по краям
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          padding: "10px 20px",
                          fontWeight: "600",
                        }}
                        onClick={() => handleDeleteNews(editingNews.id)}
                      >
                        <img
                          src={DeleteWhiteIcon}
                          alt="Удалить"
                          className="me-2"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Удалить новость
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          padding: "7px 35px",
                          fontWeight: "600",
                        }}
                      >
                        Сохранить
                      </button>
                    </div>
                  ) : (
                    // Режим добавления: одна кнопка по центру
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#FF6F00",
                          borderColor: "#FF6F00",
                          borderRadius: "20px",
                          padding: "7px 35px",
                          fontWeight: "600",
                        }}
                      >
                        Готово
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  {
    /* Иначе — показываем основную страницу с лентой новостей */
  }
  return (
    <div className="news-page-container">
      <Header />

      <div className="main-content-wrapper">
        <Sidebar />

        <main className="news-content-main">
          <div
            className="container-fluid py-4"
            style={{ paddingRight: "40px" }}
          >
            {/* Заголовок страницы с иконкой */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex flex-column align-items-center">
                  {/* Заголовок "НОВОСТИ" */}
                  <div className="d-flex align-items-center">
                    <img
                      src={NewsIcon}
                      alt="Новости"
                      className="news-title-icon me-3"
                      style={{ width: "29px", height: "28px" }}
                    />
                    <h1 className="news-main-title fw-normal">НОВОСТИ</h1>
                  </div>
                  {/* Кнопка "Добавить новость" */}
                  <div className="w-100 d-flex justify-content-end mt-2">
                    <button
                      className="btn btn-link d-flex align-items-center p-0"
                      onClick={() => setIsAddingNews(true)}
                      style={{
                        color: "#AA8144",
                        fontSize: "1.15em",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={PlusIcon}
                        alt="Добавить"
                        className="me-2"
                        style={{ width: "18px", height: "18px" }}
                      />
                      Добавить новость
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Основные новости - большая слева, две маленькие справа */}
            <div className="row g-4 mb-5">
              {/* Большая новость - левая половина */}
              <div className="col-12 col-lg-6">
                <div className="main-news-card-large card h-100 shadow-sm border-0">
                  <div className="main-news-image-large-container">
                    <img
                      src={NewsImage}
                      alt="Основная новость"
                      className="main-news-image-large"
                    />
                  </div>
                  <div className="card-body d-flex flex-column p-4">
                    <h3
                      className="main-news-title-large card-title fw-bold mb-3"
                      style={{ color: "#886128" }}
                    >
                      Ваш интернет-магазин мечты теперь ближе! Мы открылись!
                    </h3>
                    <p className="main-news-text-large card-text flex-grow-1">
                      Забудьте о сложном программировании и больших затратах.
                      Наш сервис начал работу, чтобы вы могли собрать мощный и
                      красивый магазин своими руками — с первого клика и без
                      ограничений.
                    </p>
                  </div>
                </div>
              </div>

              {/* Две маленькие новости - правая половина */}
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column h-100">
                  {/* Первая маленькая новость */}
                  <div className="main-news-card-small card shadow-sm border-0 mb-4 flex-grow-1">
                    <div className="row g-0 h-100">
                      <div className="col-4">
                        <div className="main-news-image-small-container h-100">
                          <img
                            src={NewsImage}
                            alt="Новость 2"
                            className="main-news-image-small"
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="card-body d-flex flex-column justify-content-center p-3 h-100">
                          <h4
                            className="main-news-title-small card-title fw-bold mb-2"
                            style={{ color: "#886128", textAlign: "left" }}
                          >
                            Почему именно мы?
                          </h4>
                          <p
                            className="main-news-text-small card-text"
                            style={{ textAlign: "left" }}
                          >
                            Вы развиваете бизнес, а мы делаем так, чтобы ваши
                            покупатели возвращались к вам чаще.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Вторая маленькая новость */}
                  <div className="main-news-card-small card shadow-sm border-0 flex-grow-1">
                    <div className="row g-0 h-100">
                      <div className="col-4">
                        <div className="main-news-image-small-container h-100">
                          <img
                            src={NewsImage}
                            alt="Новость 3"
                            className="main-news-image-small"
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="card-body d-flex flex-column justify-content-center p-3 h-100">
                          <h4
                            className="main-news-title-small card-title fw-bold mb-2"
                            style={{ color: "#886128", textAlign: "left" }}
                          >
                            Что-то важное
                          </h4>
                          <p
                            className="main-news-text-small card-text"
                            style={{ textAlign: "left" }}
                          >
                            Очень важная новость.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Лента новостей */}
            <div className="news-feed-section">
              {/* Заголовок ленты новостей (старое оформление) */}
              <div className="news-feed-header mb-4">
                <h3 className="news-feed-title fw-bold">Лента новостей</h3>
              </div>

              {/* Сетка новостей (4 в строке) */}
              <div className="row g-4">
                {newsList.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">
                      Нет новостей. Нажмите "+ Добавить новость".
                    </p>
                  </div>
                ) : (
                  newsList.map((news) => (
                    <div key={news.id} className="col-12 col-md-6 col-lg-3">
                      <div className="news-feed-card card h-100 shadow-sm border-0 position-relative">
                        {/* Изображение новости */}
                        <div className="news-feed-image-container">
                          <img
                            src={
                              news.image
                                ? URL.createObjectURL(news.image)
                                : "https://via.placeholder.com/260x190?text=IMG"
                            }
                            alt={news.title || "Новость"}
                            className="news-feed-image"
                          />
                          {/* Иконка редактирования */}
                          <div className="position-absolute top-0 end-0 m-2">
                            <img
                              src={EditIcon}
                              alt="Редактировать"
                              className="edit-icon"
                              style={{
                                width: "24px",
                                height: "24px",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = "1")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = "0")
                              }
                              onClick={() => handleEditNews(news)}
                            />
                          </div>
                        </div>

                        {/* Контент новости */}
                        <div className="card-body d-flex flex-column p-3">
                          <h5 className="news-feed-title card-title fw-bold mb-2">
                            {news.title}
                          </h5>
                          <p className="news-feed-text card-text flex-grow-1">
                            {news.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsPage;