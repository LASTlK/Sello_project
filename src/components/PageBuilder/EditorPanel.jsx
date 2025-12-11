import { useState, useEffect } from "react";
import { mockNews, mockProducts } from "../../data/mockData";

const EditorPanel = ({ block, onUpdate, onDelete }) => {
  const [localData, setLocalData] = useState(block.data);
  const [activeTab, setActiveTab] = useState('content');

  // Обновляем локальные данные при изменении блока
  useEffect(() => {
    setLocalData(block.data);
  }, [block]);

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    onUpdate(block.id, { data: newData });
  };

  const handleContentTypeChange = (type) => {
    const newData = { ...localData, contentType: type };
    setLocalData(newData);
    onUpdate(block.id, { data: newData });
  };

  const handleItemSelect = (itemId) => {
    const newData = { ...localData, itemId };
    setLocalData(newData);
    onUpdate(block.id, { data: newData });
  };

  const renderContentEditor = () => {
    switch (block.type) {
      case 'heading':
        return (
          <div>
            <label className="form-label fw-bold">Текст заголовка</label>
            <input
              type="text"
              className="form-control mb-3"
              value={localData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              placeholder="Введите текст заголовка"
            />
            
            <label className="form-label fw-bold">Уровень заголовка</label>
            <select 
              className="form-select mb-3"
              value={localData.level || 'h1'}
              onChange={(e) => handleChange('level', e.target.value)}
            >
              <option value="h1">H1 (Самый большой)</option>
              <option value="h2">H2 (Крупный)</option>
              <option value="h3">H3 (Средний)</option>
              <option value="h4">H4 (Мелкий)</option>
              <option value="h5">H5 (Очень мелкий)</option>
              <option value="h6">H6 (Самый мелкий)</option>
            </select>
            
            <label className="form-label fw-bold">Выравнивание</label>
            <div className="d-flex gap-2 mb-3">
              {['left', 'center', 'right'].map(align => (
                <button
                  key={align}
                  className={`btn btn-sm ${localData.alignment === align ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => handleChange('alignment', align)}
                >
                  {align === 'left' ? '←' : align === 'center' ? '↔' : '→'}
                </button>
              ))}
            </div>
            
            <label className="form-label fw-bold">Цвет текста</label>
            <input
              type="color"
              className="form-control form-control-color mb-3"
              value={localData.color || '#000000'}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </div>
        );
      
      case 'text':
        return (
          <div>
            <label className="form-label fw-bold">Текст</label>
            <textarea
              className="form-control mb-3"
              rows="5"
              value={localData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Введите текст..."
            />
            
            <label className="form-label fw-bold">Выравнивание</label>
            <div className="d-flex gap-2 mb-3">
              {['left', 'center', 'right', 'justify'].map(align => (
                <button
                  key={align}
                  className={`btn btn-sm ${localData.alignment === align ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => handleChange('alignment', align)}
                >
                  {align === 'left' ? 'По левому краю' : 
                   align === 'center' ? 'По центру' :
                   align === 'right' ? 'По правому краю' : 'По ширине'}
                </button>
              ))}
            </div>
            
            <label className="form-label fw-bold">Размер шрифта</label>
            <select 
              className="form-select"
              value={localData.fontSize || '16px'}
              onChange={(e) => handleChange('fontSize', e.target.value)}
            >
              <option value="14px">Маленький (14px)</option>
              <option value="16px">Средний (16px)</option>
              <option value="18px">Большой (18px)</option>
              <option value="20px">Очень большой (20px)</option>
              <option value="24px">Заголовочный (24px)</option>
            </select>
          </div>
        );
      
      case 'button':
        return (
          <div>
            <label className="form-label fw-bold">Текст кнопки</label>
            <input
              type="text"
              className="form-control mb-3"
              value={localData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              placeholder="Например: Купить сейчас"
            />
            
            <label className="form-label fw-bold">Ссылка</label>
            <input
              type="text"
              className="form-control mb-3"
              value={localData.url || ''}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://..."
            />
            
            <label className="form-label fw-bold">Стиль кнопки</label>
            <select 
              className="form-select mb-3"
              value={localData.variant || 'primary'}
              onChange={(e) => handleChange('variant', e.target.value)}
            >
              <option value="primary">Основной (Синий)</option>
              <option value="secondary">Вторичный (Серый)</option>
              <option value="success">Успех (Зеленый)</option>
              <option value="danger">Опасность (Красный)</option>
              <option value="warning">Предупреждение (Желтый)</option>
              <option value="info">Инфо (Голубой)</option>
              <option value="light">Светлый</option>
              <option value="dark">Темный</option>
            </select>
            
            <label className="form-label fw-bold">Размер кнопки</label>
            <select 
              className="form-select"
              value={localData.size || 'medium'}
              onChange={(e) => handleChange('size', e.target.value)}
            >
              <option value="small">Маленькая</option>
              <option value="medium">Средняя</option>
              <option value="large">Большая</option>
            </select>
          </div>
        );
      
      case 'content-block-1':
      case 'content-block-4':
      case 'content-block-5':
      case 'content-block-6':
        return (
          <div>
            <div className="mb-3">
              <label className="form-label fw-bold">Тип контента</label>
              <div className="btn-group w-100">
                <button
                  className={`btn ${localData.contentType === 'products' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleContentTypeChange('products')}
                >
                  🛍️ Товары
                </button>
                <button
                  className={`btn ${localData.contentType === 'news' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleContentTypeChange('news')}
                >
                  📰 Новости
                </button>
              </div>
            </div>
            
            <label className="form-label fw-bold">Заголовок блока</label>
            <input
              type="text"
              className="form-control mb-3"
              value={localData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Введите заголовок блока"
            />
            
            <label className="form-label fw-bold">Описание блока</label>
            <textarea
              className="form-control mb-3"
              rows="2"
              value={localData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Введите описание блока"
            />
            
            <div className="alert alert-info">
              <small>
                Этот блок автоматически заполнится {localData.contentType === 'products' ? 'товарами' : 'новостями'} из базы данных
              </small>
            </div>
          </div>
        );
      
      case 'content-block-2':
        return (
          <div>
            <div className="mb-3">
              <label className="form-label fw-bold">Тип контента</label>
              <div className="btn-group w-100">
                <button
                  className={`btn ${localData.contentType === 'products' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleContentTypeChange('products')}
                >
                  🛍️ Товар
                </button>
                <button
                  className={`btn ${localData.contentType === 'news' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleContentTypeChange('news')}
                >
                  📰 Новость
                </button>
              </div>
            </div>
            
            <label className="form-label fw-bold">Выберите элемент</label>
            <select 
              className="form-select mb-3"
              value={localData.itemId || ''}
              onChange={(e) => handleItemSelect(parseInt(e.target.value))}
            >
              <option value="">Автоматический выбор</option>
              {(localData.contentType === 'news' ? mockNews : mockProducts).map(item => (
                <option key={item.id} value={item.id}>
                  {item.title || item.name}
                </option>
              ))}
            </select>
            
            <label className="form-label fw-bold">Заголовок блока</label>
            <input
              type="text"
              className="form-control mb-3"
              value={localData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            
            <label className="form-label fw-bold">Описание блока</label>
            <textarea
              className="form-control"
              rows="2"
              value={localData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        );
      
      default:
        return (
          <div className="alert alert-warning">
            Редактор для этого типа блока в разработке
          </div>
        );
    }
  };

  const renderStyleEditor = () => {
    return (
      <div>
        <label className="form-label fw-bold">Фон блока</label>
        <input
          type="color"
          className="form-control form-control-color mb-3"
          value={localData.backgroundColor || '#ffffff'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
        />
        
        <label className="form-label fw-bold">Отступы</label>
        <div className="row g-2 mb-3">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Верхний"
              value={localData.paddingTop || ''}
              onChange={(e) => handleChange('paddingTop', e.target.value + 'px')}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Нижний"
              value={localData.paddingBottom || ''}
              onChange={(e) => handleChange('paddingBottom', e.target.value + 'px')}
            />
          </div>
        </div>
        
        <label className="form-label fw-bold">Скругление углов</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="50"
          value={parseInt(localData.borderRadius) || 0}
          onChange={(e) => handleChange('borderRadius', e.target.value + 'px')}
        />
      </div>
    );
  };

  const renderAdvancedEditor = () => {
    return (
      <div>
        <div className="alert alert-warning">
          <small>
            ⚠️ Расширенные настройки влияют на отображение на всех устройствах
          </small>
        </div>
        
        <label className="form-label fw-bold">CSS Классы</label>
        <input
          type="text"
          className="form-control mb-3"
          value={localData.className || ''}
          onChange={(e) => handleChange('className', e.target.value)}
          placeholder="Дополнительные CSS классы"
        />
        
        <label className="form-label fw-bold">ID элемента</label>
        <input
          type="text"
          className="form-control mb-3"
          value={localData.elementId || ''}
          onChange={(e) => handleChange('elementId', e.target.value)}
          placeholder="Уникальный ID"
        />
        
        <label className="form-label fw-bold">Анимация</label>
        <select 
          className="form-select"
          value={localData.animation || 'none'}
          onChange={(e) => handleChange('animation', e.target.value)}
        >
          <option value="none">Без анимации</option>
          <option value="fade">Появление</option>
          <option value="slide-up">Всплытие снизу</option>
          <option value="slide-left">Сдвиг слева</option>
        </select>
      </div>
    );
  };

  return (
    <div className="editor-panel">
      <div className="panel-header">
        <h6>
          Редактирование: {block.type === 'heading' ? 'Заголовок' : 
                          block.type === 'text' ? 'Текст' :
                          block.type === 'button' ? 'Кнопка' :
                          `Блок ${block.type.split('-')[2]}`}
        </h6>
        <button 
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            if (window.confirm('Удалить этот блок?')) {
              onDelete(block.id);
            }
          }}
        >
          🗑️ Удалить
        </button>
      </div>
      
      {/* Вкладки */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            📝 Контент
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            🎨 Стиль
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveTab('advanced')}
          >
            ⚙️ Дополнительно
          </button>
        </li>
      </ul>
      
      {/* Контент вкладок */}
      {activeTab === 'content' && renderContentEditor()}
      {activeTab === 'style' && renderStyleEditor()}
      {activeTab === 'advanced' && renderAdvancedEditor()}
      
      <div className="mt-4 pt-3 border-top">
        <small className="text-muted d-block">
          <strong>ID блока:</strong> {block.id}
        </small>
        <small className="text-muted d-block mt-1">
          <strong>Тип:</strong> {block.type}
        </small>
      </div>
      
      <div className="mt-3">
        <button 
          className="btn btn-sm btn-outline-success w-100"
          onClick={() => {
            const newData = { ...localData };
            Object.keys(newData).forEach(key => {
              if (typeof newData[key] === 'string' && newData[key].includes('px')) {
                newData[key] = newData[key].replace('px', '') + 'px';
              }
            });
            onUpdate(block.id, { data: newData });
            alert('Настройки применены!');
          }}
        >
          ✅ Применить изменения
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;