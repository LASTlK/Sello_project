import { useState, useEffect } from "react";
import EditorCanvas from "./EditorCanvas";
import ContentBlocks from "./ContentBlocks";

const PageBuilder = () => {
  const [pageData, setPageData] = useState({
    title: "Главная страница",
    blocks: []
  });

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Загружаем данные из localStorage при загрузке
  useEffect(() => {
    const saved = localStorage.getItem('pageBuilderData');
    if (saved) {
      try {
        setPageData(JSON.parse(saved));
      } catch (e) {
        console.error('Ошибка загрузки данных:', e);
      }
    }
  }, []);

  // Сохраняем данные в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
  }, [pageData]);

  const addBlock = (blockType) => {
    const newBlock = {
      id: Date.now() + Math.random(),
      type: blockType,
      data: getDefaultBlockData(blockType),
      settings: {}
    };
    
    setPageData(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    
    // Автоматически выбираем новый блок для редактирования
    setSelectedBlock(newBlock);
  };

  const updateBlock = (blockId, newData) => {
    setPageData(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === blockId ? { ...block, ...newData } : block
      )
    }));
  };

  const deleteBlock = (blockId) => {
    setPageData(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }));
    setSelectedBlock(null);
  };

  const moveBlock = (fromIndex, toIndex) => {
    const newBlocks = [...pageData.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    
    setPageData(prev => ({
      ...prev,
      blocks: newBlocks
    }));
  };

  const getDefaultBlockData = (type) => {
    const defaults = {
      'heading': { 
        text: 'Добро пожаловать в наш магазин', 
        level: 'h1',
        alignment: 'center',
        color: '#000000'
      },
      'text': { 
        content: 'Здесь вы можете добавить описание вашего магазина, продуктов или услуг. Редактируйте этот текст по вашему усмотрению.',
        alignment: 'left',
        fontSize: '16px'
      },
      'button': { 
        text: 'Перейти в каталог', 
        url: '/products',
        variant: 'primary',
        size: 'medium'
      },
      'content-block-1': { 
        title: 'Популярные категории',
        description: 'Выбирайте из тысяч товаров в различных категориях',
        contentType: 'products',
        itemsCount: 4,
        items: []
      },
      'content-block-2': { 
        title: 'Специальное предложение',
        description: 'Уникальные товары по специальным ценам только этой недели',
        contentType: 'products',
        itemId: 2,
        alignment: 'left'
      },
      'content-block-3': { 
        title: 'Новые поступления',
        description: 'Самые свежие товары в нашем ассортименте',
        contentType: 'products',
        items: [],
        rows: 2
      },
      'content-block-4': { 
        title: 'Лучшие товары месяца',
        description: 'Товары, которые наши клиенты покупают чаще всего',
        contentType: 'products',
        items: [],
        columns: 2
      },
      'content-block-5': { 
        title: 'Рекомендуем для вас',
        description: 'Подборка товаров на основе ваших предпочтений',
        contentType: 'products',
        items: [],
        columns: 3
      },
      'content-block-6': { 
        title: 'Новости и акции',
        description: 'Будьте в курсе последних новостей и специальных предложений',
        contentType: 'news',
        items: []
      },
    };
    return defaults[type] || {};
  };

  const savePage = () => {
    const dataStr = JSON.stringify(pageData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-design.json';
    a.click();
    
    alert('Дизайн страницы сохранен!');
  };

  const resetPage = () => {
    if (window.confirm('Вы уверены? Все несохраненные изменения будут потеряны.')) {
      setPageData({
        title: "Главная страница",
        blocks: []
      });
      setSelectedBlock(null);
      localStorage.removeItem('pageBuilderData');
    }
  };

  // Слушаем события от Sidebar
  useEffect(() => {
    const handleSidebarToggle = (e) => {
      setSidebarExpanded(e.detail.expanded);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
    };
  }, []);

  return (
    <div className={`page-builder-container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      <div className="editor-area">
        <EditorCanvas
          pageData={pageData}
          selectedBlock={selectedBlock}
          onSelectBlock={setSelectedBlock}
          onUpdateBlock={updateBlock}
          onDeleteBlock={deleteBlock}
          onMoveBlock={moveBlock}
        />
        
        <div className="canvas-actions mt-4">
          <button className="btn btn-primary me-2" onClick={savePage}>
            💾 Сохранить дизайн
          </button>
          <button className="btn btn-outline-secondary me-2" onClick={resetPage}>
            ⟳ Сбросить
          </button>
          <button className="btn btn-outline-success">
            👁 Предпросмотр
          </button>
        </div>
      </div>
      
      <div className="blocks-panel">
        <ContentBlocks onAddBlock={addBlock} />
      </div>
    </div>
  );
};

export default PageBuilder;