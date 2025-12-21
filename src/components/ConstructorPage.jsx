// src/components/ConstructorPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ConstructorPanel from "./ConstructorPanel";
import ContentArea from "./ContentArea";

const ConstructorPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const navigate = useNavigate();

  const handlePreview = () => {
    navigate("/preview", {
      state: { blocks, textColor, bgColor },
    });
  };

  const addBlock = (type) => {
    let initialItems = null;
    let extraProps = {};

    if (type === "fourImages") initialItems = Array(4).fill(null);
    else if (type === "twoImages") initialItems = Array(2).fill(null);
    else if (type === "threeImages") initialItems = Array(3).fill(null);
    else if (type === "bigLeftTwoSmall") initialItems = Array(3).fill(null);
    else if (["singleImageLeft", "imageRightText"].includes(type))
      initialItems = Array(1).fill(null);
    else if (type === "heading" || type === "textBlock") {
      extraProps = {
        alignment: "left",
        fontSize: "medium",
        fontStyle: "normal",
        fontFamily: "Arial",
      };
    }

    setBlocks([
      ...blocks,
      { id: Date.now(), type, items: initialItems, ...extraProps },
    ]);
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const selectBlock = (id) => setSelectedBlockId(id);

  const setBlockContent = (blockId, content) => {
    setBlocks(blocks.map((b) => (b.id === blockId ? { ...b, content } : b)));
    setSelectedBlockId(null);
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar-custom");
    if (!sidebar) return;
    const observer = new MutationObserver(() => {
      setIsSidebarExpanded(sidebar.classList.contains("expanded"));
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <Sidebar />

      <div className="my-3 d-flex align-items-center justify-content-center">
        <img
          src="/src/assets/icon/home-icon.svg"
          alt="Главная"
          style={{ marginRight: "10px", marginTop: "100px" }}
        />
        <h3 className="main-page mb-0" style={{ color: "#886128" }}>
          ГЛАВНАЯ СТРАНИЦА
        </h3>
      </div>

      <div
        className={`constructor-layout ${
          isSidebarExpanded ? "sidebar-expanded" : ""
        }`}
      >
        <ContentArea
          blocks={blocks}
          setBlocks={setBlocks}
          onBlockClick={selectBlock}
          selectedBlockId={selectedBlockId}
          onDeleteBlock={deleteBlock}
          textColor={textColor}
          bgColor={bgColor}
        />
        <ConstructorPanel
          onAddBlock={addBlock}
          textColor={textColor}
          setTextColor={setTextColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          onPreview={handlePreview}
          blocks={blocks}
        />
      </div>
    </>
  );
};

export default ConstructorPage;
