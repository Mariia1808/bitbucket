import "../css.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlatCard = ({ data=[], flatOne=false }) => {
  const toNavigate = useNavigate();
  return (
    <div className={flatOne? "flat_card" : "flat_card point"} onClick={() => toNavigate("/flat/" + data.id)}>
      <div className="flat_card_img">
        <img src={data.layout_image} className={flatOne? "image" : "img"} />
      </div>

      <div className="flat_card_text">
        <p>Цена: {data.price}</p>
        <p>Количество комнат: {data.rooms}</p>
        <p>Общая площадь: {data.area_total}</p>
        {flatOne && (
          <>
            <p>Площадь кухни: {data.area_kitchen}</p>
            <p>Жилая площадь: {data.area_live}</p>
            <p>Этаж: {data.floor}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FlatCard;
