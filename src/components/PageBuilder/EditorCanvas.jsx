import { useState } from "react";
import { mockNews, mockProducts } from "../../data/mockData";
import EditorPanel from "./EditorPanel";

const EditorCanvas = ({ 
  pageData, 
  selectedBlock, 
  onSelectBlock, 
  onUpdateBlock, 
  onDeleteBlock,
  onMoveBlock 
}) => {
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleBlockClick = (block, e) => {
    e.stopPropagation();
    onSelectBlock(block);
  };

  const handleCanvasClick = () => {
    onSelectBlock(null);
  };

  // Функции для drag & drop
  const handleDragStart = (e, block, index) => {
    e.dataTransfer.setData('text/plain', index);
    setDraggedBlock(block);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      onMoveBlock(dragIndex, dropIndex);
    }
    
    setDragOverIndex(null);
    setDraggedBlock(null);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  // Рендер заголовка
  const renderHeading = (block) => {
    const Tag = block.data.level || 'h1';
    return (
      <Tag style={{ 
        textAlign: block.data.alignment,
        color: block.data.color,
        marginBottom: '20px'
      }}>
        {block.data.text}
      </Tag>
    );
  };

  // Рендер текстового блока
  const renderText = (block) => {
    return (
      <div style={{ 
        textAlign: block.data.alignment,
        fontSize: block.data.fontSize,
        lineHeight: '1.6'
      }}>
        {block.data.content}
      </div>
    );
  };

  // Рендер кнопки
  const renderButton = (block) => {
    const sizeClass = {
      'small': 'btn-sm',
      'medium': '',
      'large': 'btn-lg'
    }[block.data.size] || '';
    
    const variantClass = {
      'primary': 'btn-primary',
      'secondary': 'btn-secondary',
      'success': 'btn-success',
      'danger': 'btn-danger',
      'warning': 'btn-warning',
      'info': 'btn-info',
      'light': 'btn-light',
      'dark': 'btn-dark'
    }[block.data.variant] || 'btn-primary';
    
    return (
      <a 
        href={block.data.url} 
        className={`btn ${variantClass} ${sizeClass}`}
        style={{ margin: '10px 0' }}
      >
        {block.data.text}
      </a>
    );
  };

  // Рендер блока 1: 4 фото в ряд
  const renderBlock1 = (block) => {
    const items = block.data.contentType === 'news' 
      ? mockNews.slice(0, block.data.itemsCount || 4)
      : mockProducts.slice(0, block.data.itemsCount || 4);
    
    return (
      <div className="content-block">
        <div className="row g-4">
          {items.map((item, idx) => (
            <div key={idx} className="col-12 col-md-3">
              <div className="image-placeholder" style={{ height: '150px' }}>
                <img 
                  src={item.image} 
                  alt={item.title || item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h5 className="mt-3">{item.title || item.name}</h5>
              <p className="text-muted small">{item.description}</p>
              {block.data.contentType === 'products' && (
                <div className="text-primary fw-bold">
                  {item.price} ₽
                </div>
              )}
            </div>
          ))}
        </div>
        {block.data.title && (
          <h3 className="mt-4 text-center">{block.data.title}</h3>
        )}
        {block.data.description && (
          <p className="text-center text-muted">{block.data.description}</p>
        )}
      </div>
    );
  };

  // Рендер блока 2: фото слева + текст справа
  const renderBlock2 = (block) => {
    const item = block.data.itemId 
      ? (block.data.contentType === 'news' 
          ? mockNews.find(n => n.id === block.data.itemId)
          : mockProducts.find(p => p.id === block.data.itemId))
      : (block.data.contentType === 'news' ? mockNews[0] : mockProducts[0]);
    
    return (
      <div className="content-block">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="image-placeholder" style={{ height: '300px' }}>
              {item && (
                <img 
                  src={item.image} 
                  alt={item.title || item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            {block.data.title && <h2>{block.data.title}</h2>}
            {block.data.description && <p className="lead">{block.data.description}</p>}
            {item && (
              <>
                <h4>{item.title || item.name}</h4>
                <p>{item.description}</p>
                {block.data.contentType === 'products' && (
                  <div className="mt-3">
                    <span className="text-primary fw-bold fs-3">{item.price} ₽</span>
                    {item.oldPrice && (
                      <span className="text-muted text-decoration-line-through ms-2">
                        {item.oldPrice} ₽
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Рендер блока 3: фото и текст в 2 строки
  const renderBlock3 = (block) => {
    const items = block.data.contentType === 'news'
      ? mockNews.slice(0, block.data.rows || 2)
      : mockProducts.slice(0, block.data.rows || 2);
    
    return (
      <div className="content-block">
        {block.data.title && <h3 className="mb-4">{block.data.title}</h3>}
        {block.data.description && <p className="text-muted mb-4">{block.data.description}</p>}
        
        {items.map((item, idx) => (
          <div key={idx} className="row mb-4 align-items-center">
            <div className="col-12 col-md-4">
              <div className="image-placeholder" style={{ height: '200px' }}>
                <img 
                  src={item.image} 
                  alt={item.title || item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h5>{item.title || item.name}</h5>
              <p className="text-muted">{item.description}</p>
              {block.data.contentType === 'products' && (
                <div className="text-primary fw-bold">{item.price} ₽</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Рендер блока 4: 2 фото в ряд с подписями
  const renderBlock4 = (block) => {
    const items = block.data.contentType === 'news'
      ? mockNews.slice(0, block.data.columns || 2)
      : mockProducts.slice(0, block.data.columns || 2);
    
    return (
      <div className="content-block">
        {block.data.title && <h3 className="text-center mb-4">{block.data.title}</h3>}
        {block.data.description && (
          <p className="text-center text-muted mb-5">{block.data.description}</p>
        )}
        
        <div className="row g-4">
          {items.map((item, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="image-placeholder" style={{ height: '250px' }}>
                <img 
                  src={item.image} 
                  alt={item.title || item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="text-center mt-3">
                <h5>{item.title || item.name}</h5>
                <p className="text-muted">{item.description}</p>
                {block.data.contentType === 'products' && (
                  <div className="text-primary fw-bold fs-4">{item.price} ₽</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Рендер блока 5: 3 фото в ряд с подписями
  const renderBlock5 = (block) => {
    const items = block.data.contentType === 'news'
      ? mockNews.slice(0, block.data.columns || 3)
      : mockProducts.slice(0, block.data.columns || 3);
    
    return (
      <div className="content-block">
        {block.data.title && <h3 className="text-center mb-4">{block.data.title}</h3>}
        {block.data.description && (
          <p className="text-center text-muted mb-5">{block.data.description}</p>
        )}
        
        <div className="row g-4">
          {items.map((item, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="image-placeholder" style={{ height: '200px' }}>
                <img 
                  src={item.image} 
                  alt={item.title || item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="text-center mt-3">
                <h5>{item.title || item.name}</h5>
                <p className="text-muted small">{item.description}</p>
                {block.data.contentType === 'products' && (
                  <div className="text-primary fw-bold">{item.price} ₽</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Рендер блока 6: большое фото слева + 2 маленьких справа
  const renderBlock6 = (block) => {
    const items = block.data.contentType === 'news'
      ? mockNews.slice(0, 3)
      : mockProducts.slice(0, 3);
    
    return (
      <div className="content-block">
        {block.data.title && <h3 className="mb-4">{block.data.title}</h3>}
        {block.data.description && <p className="text-muted mb-4">{block.data.description}</p>}
        
        <div className="row">
          <div className="col-12 col-md-8">
            {items[0] && (
              <>
                <div className="image-placeholder" style={{ height: '400px' }}>
                  <img 
                    src={items[0].image} 
                    alt={items[0].title || items[0].name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="mt-3">
                  <h4>{items[0].title || items[0].name}</h4>
                  <p>{items[0].description}</p>
                  {block.data.contentType === 'products' && (
                    <div className="text-primary fw-bold fs-3">{items[0].price} ₽</div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column h-100">
              {items.slice(1).map((item, idx) => (
                <div key={idx} className="mb-4">
                  <div className="image-placeholder" style={{ height: '180px' }}>
                    <img 
                      src={item.image} 
                      alt={item.title || item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="mt-2">
                    <h6>{item.title || item.name}</h6>
                    <p className="text-muted small">{item.description}</p>
                    {block.data.contentType === 'products' && (
                      <div className="text-primary fw-bold">{item.price} ₽</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Основной рендер блока
  const renderBlock = (block, index) => {
    const isSelected = selectedBlock?.id === block.id;
    const isDraggingOver = dragOverIndex === index;
    
    let blockContent;
    
    switch (block.type) {
      case 'heading':
        blockContent = renderHeading(block);
        break;
      
      case 'text':
        blockContent = renderText(block);
        break;
      
      case 'button':
        blockContent = renderButton(block);
        break;
      
      case 'content-block-1':
        blockContent = renderBlock1(block);
        break;
      
      case 'content-block-2':
        blockContent = renderBlock2(block);
        break;
      
      case 'content-block-3':
        blockContent = renderBlock3(block);
        break;
      
      case 'content-block-4':
        blockContent = renderBlock4(block);
        break;
      
      case 'content-block-5':
        blockContent = renderBlock5(block);
        break;
      
      case 'content-block-6':
        blockContent = renderBlock6(block);
        break;
      
      default:
        blockContent = <div>Неизвестный тип блока</div>;
    }
    
    return (
      <div
        key={block.id}
        className={`block-wrapper ${isSelected ? 'selected' : ''} ${isDraggingOver ? 'drag-over' : ''}`}
        onClick={(e) => handleBlockClick(block, e)}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, block, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
        onDragEnd={handleDragEnd}
        style={{
          borderColor: isDraggingOver ? '#667eea' : undefined,
          backgroundColor: isDraggingOver ? '#f0f7ff' : undefined,
          transform: isDraggingOver ? 'scale(1.02)' : undefined
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">
            {block.type === 'heading' ? 'Заголовок' : 
             block.type === 'text' ? 'Текст' :
             block.type === 'button' ? 'Кнопка' :
             `Блок ${block.type.split('-')[2]}`}
          </small>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={(e) => {
                e.stopPropagation();
                onSelectBlock(block);
              }}
            >
              ✏️
            </button>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteBlock(block.id);
              }}
            >
              🗑️
            </button>
            <span className="btn btn-sm btn-outline-info" style={{ cursor: 'move' }}>
              ↕️ Перетащи
            </span>
          </div>
        </div>
        
        {blockContent}
        
        {isDraggingOver && (
          <div className="drop-indicator">
            ↓ Перетащите сюда ↓
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="editor-canvas" onClick={handleCanvasClick}>
      <div className="canvas-header">
        <h2>{pageData.title}</h2>
        <div className="user-indicator">
          👤 Пользователь
        </div>
      </div>
      
      <div className="blocks-container">
        {pageData.blocks.map((block, index) => renderBlock(block, index))}
        
        {pageData.blocks.length === 0 && (
          <div className="empty-canvas">
            <div className="text-center">
              <div className="mb-3" style={{ fontSize: '48px' }}>✨</div>
              <h4 className="mb-2">Начните создавать свою страницу</h4>
              <p className="text-muted mb-4">
                Перетащите блоки из правой панели или выберите их кликом
              </p>
              <div className="d-flex justify-content-center gap-3">
                <div className="text-center">
                  <div className="mb-2">1</div>
                  <div>Выберите блок</div>
                </div>
                <div className="text-center">
                  <div className="mb-2">2</div>
                  <div>Перетащите на холст</div>
                </div>
                <div className="text-center">
                  <div className="mb-2">3</div>
                  <div>Настройте параметры</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {selectedBlock && (
        <EditorPanel
          block={selectedBlock}
          onUpdate={onUpdateBlock}
          onDelete={onDeleteBlock}
        />
      )}
    </div>
  );
};

export default EditorCanvas;