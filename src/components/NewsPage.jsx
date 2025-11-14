import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import NewsIcon from "../assets/icon/news-icon.svg";

import NewsImage1 from "../assets/images/news1.jpg";
import NewsImage2 from "../assets/images/news1.jpg";
import NewsImage3 from "../assets/images/news1.jpg";
import NewsImage4 from "../assets/images/news1.jpg";

const NewsPage = () => {
  const [userName, setUserName] = useState("");

  {/* Основные новости */}
  const mainNews = [
    {
      id: 1,
      title: "Ваш интернет-магазин мечты теперь ближе! Мы открылись!",
      content: "Забудьте о сложном программировании и больших затратах. Наш сервис начал работу, чтобы вы могли собрать мощный и красивый магазин своими руками — с первого клика и без ограничений.",
      image: NewsImage1,
      imageSize: "large"
    },
    {
      id: 2,
      title: "Что-то важное",
      content: "Очень важная новость ванно-концентрации боефроматериальных транспортов ванно-концентрации ванно-концентрации.",
      image: NewsImage2,
      imageSize: "small"
    },
    {
      id: 3,
      title: "Почему именно мы?",
      content: "Вы развиваете бизнес, а мы делаем так, чтобы ваши покупатели возвращались к вам чаще.",
      image: NewsImage3,
      imageSize: "small"
    }
  ];

  {/* Новости ленты */}
  const newsFeed = [
    {
      id: 1,
      content: "Подключили сервис автоматического отслеживания заказов. Клиенты всегда знают, где их посылка.",
      image: NewsImage4
    },
    {
      id: 2,
      content: "Теперь все магазины могут в один клик подключить выгодные тарифы на доставку от ведущих логистических компаний.",
      image: NewsImage1
    },
    {
      id: 3,
      content: "Подключили экологичные способы доставки. Предлагайте клиентам вариант с уменьшенным углеродным следом за небольшую доплату.",
      image: NewsImage2
    },
    {
      id: 4,
      content: "Добавили возможность принимать чаевые онлайн. Дайте клиентам возможность отблагодарить курьера или менеджера при оплате заказа.",
      image: NewsImage3
    }
  ];

  return (
    <div className="news-page-container">
      <Header />
      
      <div className="main-content-wrapper">
        <Sidebar />
        
        <main className="news-content-main">
          <div className="container-fluid py-4" style={{ paddingRight: '40px' }}>
            
            {/* Заголовок страницы с иконкой */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-center">
                  <img 
                    src={NewsIcon} 
                    alt="Новости" 
                    className="news-title-icon me-3"
                    style={{ width: '29px', height: '28px' }}
                  />
                  <h1 className="news-main-title fw-normal">НОВОСТИ</h1>
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
                      src={mainNews[0].image} 
                      alt={mainNews[0].title}
                      className="main-news-image-large"
                    />
                  </div>
                  <div className="card-body d-flex flex-column p-4">
                    <h3 className="main-news-title-large card-title fw-bold mb-3" style={{ color: '#886128' }}>{mainNews[0].title}</h3>
                    <p className="main-news-text-large card-text flex-grow-1">{mainNews[0].content}</p>
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
                            src={mainNews[1].image} 
                            alt={mainNews[1].title}
                            className="main-news-image-small"
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="card-body d-flex flex-column justify-content-center p-3 h-100">
                          <h4 className="main-news-title-small card-title fw-bold mb-2" style={{ color: '#886128', textAlign: 'left' }}>{mainNews[1].title}</h4>
                          <p className="main-news-text-small card-text" style={{ textAlign: 'left' }}>{mainNews[1].content}</p>
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
                            src={mainNews[2].image} 
                            alt={mainNews[2].title}
                            className="main-news-image-small"
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="card-body d-flex flex-column justify-content-center p-3 h-100">
                          <h4 className="main-news-title-small card-title fw-bold mb-2" style={{ color: '#886128', textAlign: 'left' }}>{mainNews[2].title}</h4>
                          <p className="main-news-text-small card-text" style={{ textAlign: 'left' }}>{mainNews[2].content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Лента новостей */}
            <div className="news-feed-section">
              {/* Заголовок ленты новостей */}
              <div className="news-feed-header mb-4">
                <h3 className="news-feed-title fw-bold">Лента новостей</h3>
              </div>
              
              {/* 4 новости в строку */}
              <div className="row g-4">
                {newsFeed.map((news) => (
                  <div key={news.id} className="col-12 col-md-6 col-lg-3">
                    <div className="news-feed-card card h-100 shadow-sm border-0">
                      {/* Изображение новости */}
                      <div className="news-feed-image-container">
                        <img 
                          src={news.image} 
                          alt="Новость"
                          className="news-feed-image"
                        />
                      </div>
                      
                      {/* Контент новости */}
                      <div className="card-body d-flex flex-column p-3">
                        <p className="news-feed-text card-text flex-grow-1">{news.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsPage;