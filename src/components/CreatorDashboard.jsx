// src/components/CreatorDashboard.jsx
import React, { useState } from 'react';
import Header from './Header';
import plusIcon from '../assets/icon/plus-icon-brown.svg';
import editIcon from '../assets/icon/edit-icon.svg';
import deleteIcon from '../assets/icon/delete-icon.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const CreatorDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCategory, setNewBrandCategory] = useState('');

  // Моковые данные
  const [brands, setBrands] = useState([
    { id: 1, name: 'СуперМагазин', createdAt: '18.12.2025', category: 'Электроника', orders: 46736482 },
    { id: 2, name: 'Селло', createdAt: '19.11.2025', category: 'Одежда', orders: 100 },
    { id: 3, name: 'Магазин', createdAt: '07.11.2025', category: 'Книги', orders: 0 },
    { id: 4, name: 'Лучший магазин', createdAt: '01.11.2025', category: 'Продукты', orders: 2874966386365 },
    { id: 5, name: 'Новый магазин', createdAt: '12.10.2025', category: 'Обувь', orders: 24 },
  ]);

  const handleAddBrand = () => {
    if (!newBrandName.trim() || !newBrandCategory.trim()) return;

    const newBrand = {
      id: brands.length + 1,
      name: newBrandName,
      createdAt: new Date().toLocaleDateString('ru-RU'),
      category: newBrandCategory,
      orders: 0,
    };

    setBrands([...brands, newBrand]);
    setNewBrandName('');
    setNewBrandCategory('');
    setShowModal(false);
    console.log('Переход на BrandsPage...');
  };

  const handleEditBrand = (brand) => {
    window.location.href = `/constructor?brandId=${brand.id}`;
  };

  const handleDeleteBrand = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот магазин?')) {
      setBrands(brands.filter(brand => brand.id !== id));
    }
  };

  // Статистика
  const totalOrders = brands.reduce((sum, b) => sum + b.orders, 0);
  const totalBrands = brands.length;
  const avgOrdersPerBrand = totalBrands > 0 ? Math.round(totalOrders / totalBrands) : 0;

  // Топ-магазин по заказам
  const topBrand = brands.reduce((prev, current) => (prev.orders > current.orders ? prev : current), brands[0]);

  // Данные для графиков
  const barChartData = {
    labels: brands.map(b => b.name),
    datasets: [
      {
        label: 'Количество заказов',
        data: brands.map(b => b.orders),
        backgroundColor: '#FFCA28',
        borderColor: '#FFA000',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Активные магазины', 'Без заказов'],
    datasets: [
      {
        data: [brands.filter(b => b.orders > 0).length, brands.filter(b => b.orders === 0).length],
        backgroundColor: ['#FFA000', '#F9E5C8'],
        borderColor: '#886128',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#EED1A6'
        },
        ticks: {
          color: '#886128'
        }
      },
      x: {
        grid: {
          color: '#EED1A6'
        },
        ticks: {
          color: '#886128',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  // Опции для дугового графика — ограничиваем высоту
  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    aspectRatio: 1, // Сохраняет квадратную форму
    maintainAspectRatio: false, // Разрешает растягивать по высоте
  };

  return (
    <div style={{ backgroundColor: '#FFFAF4', minHeight: '100vh' }}>
      <Header />

      {/* Отступ сверху, чтобы Header не перекрывал контент */}
      <div style={{ paddingTop: '70px' }}></div>

      <div className="container mt-4">
        {/* Заголовок */}
        <h1 className="text-center mb-4" style={{ color: '#886128', fontWeight: 'bold' }}>Личный кабинет</h1>

        {/* Строка "Мои проекты" + кнопка "Добавить проект" */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span style={{ color: '#886128', fontSize: '1.2rem' }}>Мои проекты</span>
          <button
            className="btn d-flex align-items-center"
            onClick={() => setShowModal(true)}
            style={{
              color: '#AA8144',
              border: 'none',
              background: 'none',
              padding: '5px 10px',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            <img src={plusIcon} alt="Плюс" style={{ width: '20px', marginRight: '8px' }} />
            Добавить проект
          </button>
        </div>

        {/* Таблица проектов */}
{/* Таблица проектов */}
<div className="table-responsive">
  <table style={{ 
    width: '100%',
    backgroundColor: '#FFF',
    borderCollapse: 'collapse',
    border: '1px solid #EED1A6',
    marginBottom: '1rem'
  }}>
    <thead>
      <tr>
        <th style={{ 
          backgroundColor: '#F9E5C8',
          color: '#886128',
          border: '1px solid #EED1A6',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          №
        </th>
        <th style={{ 
          backgroundColor: '#F9E5C8',
          color: '#886128',
          border: '1px solid #EED1A6',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          Название магазина
        </th>
        <th style={{ 
          backgroundColor: '#F9E5C8',
          color: '#886128',
          border: '1px solid #EED1A6',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          Дата создания
        </th>
        <th style={{ 
          backgroundColor: '#F9E5C8',
          color: '#886128',
          border: '1px solid #EED1A6',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          Категория магазина
        </th>
        <th style={{ 
          backgroundColor: '#F9E5C8',
          color: '#886128',
          border: '1px solid #EED1A6',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: '12px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          Опции
        </th>
      </tr>
    </thead>
    <tbody>
      {brands.map((brand, index) => (
        <tr key={brand.id} style={{ border: '1px solid #EED1A6' }}>
          <td style={{ 
            border: '1px solid #EED1A6', 
            color: '#886128', 
            textAlign: 'center', 
            verticalAlign: 'middle', 
            padding: '12px',
            fontSize: '15px'
          }}>
            {index + 1}
          </td>
          <td style={{ 
            border: '1px solid #EED1A6', 
            color: '#886128', 
            textAlign: 'center', 
            verticalAlign: 'middle', 
            padding: '12px',
            fontSize: '15px'
          }}>
            {brand.name}
          </td>
          <td style={{ 
            border: '1px solid #EED1A6', 
            color: '#886128', 
            textAlign: 'center', 
            verticalAlign: 'middle', 
            padding: '12px',
            fontSize: '15px'
          }}>
            {brand.createdAt}
          </td>
          <td style={{ 
            border: '1px solid #EED1A6', 
            color: '#886128', 
            textAlign: 'center', 
            verticalAlign: 'middle', 
            padding: '12px',
            fontSize: '15px'
          }}>
            {brand.category}
          </td>
          <td style={{ 
            border: '1px solid #EED1A6', 
            color: '#886128', 
            textAlign: 'center', 
            verticalAlign: 'middle', 
            padding: '12px',
            fontSize: '15px'
          }}>
            <div className="d-flex justify-content-center gap-1">
              <button
                className="brands-edit-btn"
                onClick={() => handleEditBrand(brand)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#886128',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  fontSize: '14px'
                }}
              >
                <img
                  src={editIcon}
                  alt="Изменить"
                  className="brands-action-icon"
                  style={{ width: '16px', marginRight: '4px' }}
                />
                Изменить
              </button>
              <button
                className="brands-delete-btn"
                onClick={() => handleDeleteBrand(brand.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#886128',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  fontSize: '14px'
                }}
              >
                <img
                  src={deleteIcon}
                  alt="Удалить"
                  className="brands-action-icon"
                  style={{ width: '16px' }}
                />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Статистика */}
        <div className="mt-5 p-4" style={{ backgroundColor: '#F9E5C8', borderRadius: '8px' }}>
          <h3 className="text-center mb-4" style={{ color: '#886128' }}>СТАТИСТИКА</h3>

          <div className="row g-4">
            {/* Общая статистика */}
            <div className="col-lg-6">
              <div className="p-3" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '150px' }}>
                <h5 className='text-center' style={{ color: '#886128' }}>Общая статистика</h5>
                <div className="d-flex justify-content-between my-2">
                  <span>Всего магазинов:</span>
                  <strong style={{ color: '#886128' }}>{totalBrands}</strong>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <span>Всего заказов:</span>
                  <strong style={{ color: '#886128' }}>{totalOrders.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <span>Среднее количество заказов на магазин:</span>
                  <strong style={{ color: '#886128' }}>{avgOrdersPerBrand}</strong>
                </div>
              </div>
            </div>

            {/* Топ-магазин по заказам */}
            <div className="col-lg-6">
              <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '150px' }}>
                <h5 className='text-center mb-3' style={{ color: '#886128' }}>Топ-магазин по заказам</h5>
                {brands.length > 0 ? (
                  <>
                    <p style={{ marginTop: '20px' }}><strong>{topBrand.name}</strong></p>
                    <p>Заказов: <strong>{topBrand.orders.toLocaleString()}</strong></p>
                  </>
                ) : (
                  <p>Нет данных</p>
                )}
              </div>
            </div>

            {/* График - Заказы по магазинам */}
            <div className="col-lg-6">
              <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '350px', display: 'flex', flexDirection: 'column' }}>
                <h5 className='text-center' style={{ color: '#886128' }}>Заказы по магазинам</h5>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Активность магазинов (дуговой график) */}
            <div className="col-lg-6">
              <div className="p-4" style={{ backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '350px', display: 'flex', flexDirection: 'column' }}>
                <h5 className='text-center' style={{ color: '#886128' }}>Активность магазинов</h5>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Doughnut data={doughnutChartData} options={doughnutOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Всплывающее окно добавления проекта */}
      {showModal && (
        <div className="modal-backdrop show" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}></div>
      )}
      {showModal && (
        <div
          className="modal show d-block"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1051,
            backgroundColor: '#FFF',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '35vh',
            overflowY: 'auto'
          }}
        >
          <h5 className='text-center' style={{ color: '#886128' }}>Добавить проект</h5>
          <div className="mb-3">
            <label htmlFor="brandName" className="form-label" style={{ color: '#886128' }}>Название магазина</label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="Введите название магазина"
              style={{ borderColor: '#EED1A6', color: '#886128' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brandCategory" className="form-label" style={{ color: '#886128' }}>Категория магазина</label>
            <input
              type="text"
              className="form-control"
              id="brandCategory"
              value={newBrandCategory}
              onChange={(e) => setNewBrandCategory(e.target.value)}
              placeholder="Введите категорию"
              style={{ borderColor: '#EED1A6', color: '#886128' }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn me-2"
              onClick={() => setShowModal(false)}
              style={{ color: '#886128', border: '1px solid #EED1A6', background: 'none' }}
            >
              Отмена
            </button>
            <button
              className="btn"
              onClick={handleAddBrand}
              style={{ backgroundColor: '#FFA000', color: 'white', border: 'none' }}
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;