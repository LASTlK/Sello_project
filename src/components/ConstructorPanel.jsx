// src/components/ConstructorPanel.jsx
import React, { useState } from "react";

const blockPreviews = {
  fourImages: "src/assets/images/four-images.svg",
  singleImageLeft: "src/assets/images/single-image.svg",
  imageRightText: "src/assets/images/image-right-text.svg",
  twoImages: "src/assets/images/two-images.svg",
  threeImages: "src/assets/images/three-images.svg",
  bigLeftTwoSmall: "src/assets/images/big-left-two-small.svg",
};

const ConstructorPanel = ({
  onAddBlock,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  onPreview,
  blocks,
}) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const blockTypes = [
    { id: "fourImages" },
    { id: "singleImageLeft" },
    { id: "imageRightText" },
    { id: "twoImages" },
    { id: "threeImages" },
    { id: "bigLeftTwoSmall" },
  ];

  const additionalElements = [
    { id: "heading", label: "+ Добавить заголовок" },
    { id: "textBlock", label: "+ Добавить текстовый блок" },
    { id: "button", label: "+ Добавить кнопку" },
  ];

  return (
    <div className="constructor-panel">
      <h5 className="mb-3 text-center">Конструктор</h5>

      {/* Блоки контента */}
      <div className="mb-4">
        <h6 className="mb-2 text-center">Блоки контента</h6>
        <div className="block-preview-grid">
          {blockTypes.map((block) => (
            <div
              key={block.id}
              className="block-preview-item"
              onClick={() => onAddBlock(block.id)}
            >
              <img
                src={blockPreviews[block.id]}
                alt=""
                className="block-preview-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Текстовые элементы */}
      <div className="mb-4">
        {additionalElements.map((el) => (
          <button
            key={el.id}
            className="btn btn-outline-secondary w-100 mb-2"
            onClick={() => onAddBlock(el.id)}
          >
            {el.label}
          </button>
        ))}
      </div>

      {/* Кнопки оформления */}
      <div className="mb-4">
        <h6 className="mb-4 text-center">Оформление</h6>
        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-secondary text-start"
            onClick={() => setShowTextColorPicker(true)}
          >
            Цвет текста
          </button>
          <button
            className="btn btn-outline-secondary text-start"
            onClick={() => setShowBgColorPicker(true)}
          >
            Цвет фона
          </button>
        </div>
      </div>

      {/* Кнопка предпросмотра */}
      <div>
        <button className="btn btn-outline-secondary w-100" onClick={onPreview}>
          Предпросмотр
        </button>
      </div>

      {/* Кнопка сохранения — с защитой */}
      {/* Кнопка сохранения — с сохранением items */}
<div className="mt-4">
  <button
    className="btn btn-outline-secondary w-100"
    onClick={() => {
      try {
        if (!blocks || !Array.isArray(blocks)) {
          alert("Ошибка: нет данных для сохранения.");
          console.log("blocks:", blocks);
          return;
        }

        // Глубокая копия без функций
        const cleanBlocks = blocks.map(block => {
          let cleanedBlock = { ...block };

          // Если есть items — очистим их от ненужного
          if (Array.isArray(cleanedBlock.items)) {
            cleanedBlock.items = cleanedBlock.items.map(item => {
              if (!item) return null;
              // Оставляем только нужные поля
              return {
                type: item.type,
                title: item.title,
                image: item.image,
                text: item.text,     // для новости
                description: item.description, // для товара
                price: item.price,   // для товара
              };
            });
          }

          // Убираем несериализуемые поля (если есть)
          delete cleanedBlock.ref; // например, если где-то остался ref
          delete cleanedBlock.onOpenModal; // если случайно попало

          return cleanedBlock;
        });

        const data = {
          blocks: cleanBlocks,
          textColor: textColor || "#000000",
          bgColor: bgColor || "#ffffff",
        };

        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "конструктор-главная.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert("✅ Файл успешно сохранён!");
      } catch (err) {
        console.error("Ошибка при сохранении:", err);
        alert(`❌ Ошибка при сохранении: ${err.message}`);
      }
    }}
  >
    Сохранить
  </button>
</div>

      {/* Модалка выбора цвета */}
      {(showTextColorPicker || showBgColorPicker) && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowTextColorPicker(false);
            setShowBgColorPicker(false);
          }}
        >
          <div
            className="modal-content modal-content-narrow"
            onClick={(e) => e.stopPropagation()}
          >
            <h5>{showTextColorPicker ? "Цвет текста" : "Цвет фона"}</h5>
            <input
              type="color"
              value={showTextColorPicker ? textColor : bgColor}
              onChange={(e) => {
                if (showTextColorPicker) setTextColor(e.target.value);
                else setBgColor(e.target.value);
              }}
              style={{
                width: "100%",
                height: "50px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
            <button
              className="btn btn-secondary mt-3"
              onClick={() => {
                setShowTextColorPicker(false);
                setShowBgColorPicker(false);
              }}
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructorPanel;