const ContentBlocks = ({ onAddBlock }) => {
  const basicBlocks = [
    { 
      id: 'heading', 
      label: 'Добавить заголовок', 
      icon: 'H',
      description: 'Заголовок любого уровня (H1-H6)',
      color: '#667eea'
    },
    { 
      id: 'text', 
      label: 'Добавить текстовый блок', 
      icon: 'T',
      description: 'Текстовый блок с форматированием',
      color: '#764ba2'
    },
    { 
      id: 'button', 
      label: 'Добавить кнопку', 
      icon: 'B',
      description: 'Кнопка с ссылкой и стилями',
      color: '#f093fb'
    },
  ];

  const contentBlocks = [
    { 
      id: 'content-block-1', 
      label: '4 фото в ряд',
      description: '4 фото в ряд с заголовком и описанием под ними',
      preview: 'grid-4',
      items: 4
    },
    { 
      id: 'content-block-2', 
      label: 'Фото + текст',
      description: 'Одно фото слева и справа заголовок с описанием',
      preview: 'left-image',
      items: 1
    },
    { 
      id: 'content-block-3', 
      label: 'Два ряда фото+текст',
      description: 'В двух строках: фото и справа заголовок с описанием',
      preview: 'two-rows',
      items: 2
    },
    { 
      id: 'content-block-4', 
      label: '2 фото с подписями',
      description: 'Два фото в ряд и под каждым заголовок с описанием',
      preview: 'grid-2',
      items: 2
    },
    { 
      id: 'content-block-5', 
      label: '3 фото с подписями',
      description: 'Три фото в ряд и под каждым заголовок с описанием',
      preview: 'grid-3',
      items: 3
    },
    { 
      id: 'content-block-6', 
      label: 'Большое + 2 маленьких',
      description: 'Одно большое фото слева и два маленьких справа',
      preview: 'main-side',
      items: 3
    },
  ];

  const handleBlockClick = (blockType) => {
    onAddBlock(blockType);
  };

  // Рендер превью для блоков
  const renderPreview = (type) => {
    switch (type) {
      case 'grid-4':
        return (
          <div className="preview-placeholder">
            <div className="d-flex h-100">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-fill border m-1 bg-light"></div>
              ))}
            </div>
          </div>
        );
      case 'grid-3':
        return (
          <div className="preview-placeholder">
            <div className="d-flex h-100">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-fill border m-1 bg-light"></div>
              ))}
            </div>
          </div>
        );
      case 'grid-2':
        return (
          <div className="preview-placeholder">
            <div className="d-flex h-100">
              {[1, 2].map(i => (
                <div key={i} className="flex-fill border m-1 bg-light"></div>
              ))}
            </div>
          </div>
        );
      case 'left-image':
        return (
          <div className="preview-placeholder">
            <div className="d-flex h-100">
              <div className="w-50 border m-1 bg-light"></div>
              <div className="w-50 border m-1 bg-secondary bg-opacity-25"></div>
            </div>
          </div>
        );
      case 'two-rows':
        return (
          <div className="preview-placeholder">
            <div className="d-flex flex-column h-100">
              {[1, 2].map(i => (
                <div key={i} className="d-flex flex-fill mb-1">
                  <div className="w-40 border m-1 bg-light"></div>
                  <div className="w-60 border m-1 bg-secondary bg-opacity-25"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'main-side':
        return (
          <div className="preview-placeholder">
            <div className="d-flex h-100">
              <div className="w-70 border m-1 bg-light"></div>
              <div className="w-30 d-flex flex-column">
                <div className="flex-fill border m-1 bg-secondary bg-opacity-25"></div>
                <div className="flex-fill border m-1 bg-secondary bg-opacity-25"></div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="preview-placeholder"></div>;
    }
  };

  return (
    <div className="content-blocks-panel">
      <div className="sticky-top bg-white pb-3" style={{ top: '-25px', paddingTop: '25px' }}>
        <h5 className="mb-3 d-flex align-items-center">
          <span className="me-2">🧩</span>
          Конструктор
        </h5>
        
        <div className="search-block mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Поиск блоков..."
          />
        </div>
      </div>
      
      <div className="basic-blocks mb-5">
        <h6 className="text-muted mb-3 d-flex align-items-center">
          <span className="me-2">📝</span>
          Базовые элементы
        </h6>
        {basicBlocks.map(block => (
          <button
            key={block.id}
            className="block-btn"
            onClick={() => handleBlockClick(block.id)}
            style={{ 
              background: `linear-gradient(135deg, ${block.color} 0%, ${block.color}99 100%)` 
            }}
          >
            <span 
              className="block-icon"
              style={{ background: 'rgba(255, 255, 255, 0.3)' }}
            >
              {block.icon}
            </span>
            <div className="d-flex flex-column">
              <span>{block.label}</span>
              <small style={{ opacity: 0.9, fontSize: '12px' }}>
                {block.description}
              </small>
            </div>
          </button>
        ))}
      </div>
      
      <div className="content-blocks">
        <h6 className="text-muted mb-3 d-flex align-items-center">
          <span className="me-2">🎨</span>
          Блоки контента
          <span className="badge bg-primary ms-2">{contentBlocks.length}</span>
        </h6>
        
        {contentBlocks.map(block => (
          <div
            key={block.id}
            className="content-block-item"
            onClick={() => handleBlockClick(block.id)}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center">
                <div 
                  className="me-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {block.items}
                </div>
                <div>
                  <strong>{block.label}</strong>
                  <div className="badge bg-light text-dark ms-2">
                    {block.items} элемента
                  </div>
                </div>
              </div>
              <button className="btn btn-sm btn-outline-primary">
                + Добавить
              </button>
            </div>
            <small className="text-muted d-block mb-2">{block.description}</small>
            
            {renderPreview(block.preview)}
            
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <small className="text-muted">
                📸 Можно заполнить: товарами, новостями, категориями
              </small>
              <span className="badge bg-info">Готовый блок</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-top">
        <h6 className="text-muted mb-3">💡 Советы</h6>
        <div className="alert alert-light">
          <small>
            <strong>Как использовать:</strong>
            <ul className="mb-0 mt-2">
              <li>Кликните на блок, чтобы добавить его на страницу</li>
              <li>Перетащите блоки для изменения порядка</li>
              <li>Кликните на добавленный блок для настройки</li>
              <li>Сохраняйте дизайн регулярно</li>
            </ul>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ContentBlocks;