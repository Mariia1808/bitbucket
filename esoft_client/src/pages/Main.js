import "../css.css";
import React, { useCallback, useEffect, useState } from "react";
import { getAll } from "../http/API_flat";
import FlatCard from "../component/FlatCard";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";

const Main = () => {
  const [flats, setFlats] = useState(undefined);
  const [flatsPage, setFlatsPage] = useState(undefined);
  const [flatsFilter, setFlatsFilter] = useState([]);
  const [count, setCount] = useState(3);
  const [notFound, setNotFound] = useState(null);
  const [filters, setFilters] = useState({
    fromPrice: "",
    fromArea: "",
    fromAreaKitchen: "",
    fromFloor: "",
    fromAreaLive: "",
    room: "",
    toArea: "",
    toAreaLive: "",
    toAreaKitchen: "",
    toPrice: "",
    toFloor: "",
  });
  const [dop, setDop] = useState(false);

  useEffect(() => {
    getAll().then((data) => {
      setFlats(data);
      setFlatsFilter(data);
      setNotFound('')
    });
  }, []);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setCount(Math.ceil(flatsFilter?.length / 8));
    setFlatsPage(flatsFilter?.slice(0, 8));
  }, [flatsFilter]);

  useEffect(() => {
    setFlatsPage(flatsFilter?.slice((page - 1) * 8, page * 8));
  }, [page]);

  const filterFromTo = (value, what) => {
    if (
      what === "fromPrice" ||
      "fromArea" ||
      "fromAreaKitchen" ||
      "fromFloor" ||
      "room"
    ) {
      setFilters((prevState) => ({ ...prevState, [what]: value || 0 }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        [what]: value || 10000000000,
      }));
    }
  };

  useEffect(() => {
    let array = [];
    const to = 100000000000;
    const from = 0;
    flats?.map((item) => {
      if (
        parseInt(item.price) <= parseInt(filters["toPrice"] || to) &&
        parseInt(filters["fromPrice"] || from) <= parseInt(item.price) &&
        parseFloat(item.area_total) <= parseFloat(filters["toArea"] || to) &&
        parseFloat(item.area_total) >=
          parseFloat(filters["fromArea"] || from) &&
        parseInt(item.floor) <= parseInt(filters["toFloor"] || to) &&
        parseInt(filters["fromFloor"] || from) <= parseInt(item.floor) &&
        parseFloat(item.area_kitchen) <=
          parseFloat(filters["toAreaKitchen"] || to) &&
        parseFloat(item.area_kitchen) >=
          parseFloat(filters["fromAreaKitchen"] || from) &&
        parseFloat(item.area_live) <= parseFloat(filters["toAreaLive"] || to) &&
        parseFloat(item.area_live) >=
          parseFloat(filters["fromAreaLive"] || from)
      ) {
        array.push(item);
      }
    });
    array = filters["room"]
      ? (array || flats).filter((item) => item.rooms === filters["room"])
      : array;
    setFlatsFilter(array);
    setNotFound(array.length ? null : "Ничего не найдено");
  }, [filters]);

  const refresh = () => {
    setCount(Math.ceil(flatsFilter?.length / 8));
    setFlatsPage(flatsFilter?.slice(0, 8));
  };

  const UpPrice = () => {
    setFlatsFilter(
      flatsFilter.sort((a, b) => {
        {
          return a.price - b.price;
        }
      })
    );
    refresh();
  };
  const DownPrice = () => {
    setFlatsFilter(
      flatsFilter.sort((a, b) => {
        {
          return b.price - a.price;
        }
      })
    );
    refresh();
  };
  const UpArea = () => {
    setFlatsFilter(
      flatsFilter.sort((a, b) => {
        {
          return parseFloat(a.area_total) - parseFloat(b.area_total);
        }
      })
    );
    refresh();
  };
  const DownArea = () => {
    setFlatsFilter(
      flatsFilter.sort((a, b) => {
        {
          return parseFloat(b.area_total) - parseFloat(a.area_total);
        }
      })
    );
    refresh();
  };

  const restart = () => {
    setFlatsFilter(flats);
    setFilters({
      fromPrice: "",
      fromArea: "",
      fromAreaKitchen: "",
      fromFloor: "",
      fromAreaLive: "",
      room: "",
      toArea: "",
      toAreaLive: "",
      toAreaKitchen: "",
      toPrice: "",
      toFloor: "",
    });
    setDop(false);
    refresh();
  };

  return (
    <>
      <div className="filter">
        <div>
          <button onClick={() => UpPrice()}>По возрастанию цены</button>
          <button onClick={() => DownPrice()}>По убыванию цены</button>
          <button onClick={() => UpArea()}>По возрастанию площади</button>
          <button onClick={() => DownArea()}>По убыванию площади</button>
        </div>
        <div>
          Комнаты
          <div>
            <button onClick={() => filterFromTo(1, "room")}>1</button>
            <button onClick={() => filterFromTo(2, "room")}>2</button>
            <button onClick={() => filterFromTo(3, "room")}>3</button>
          </div>
        </div>
        <div>
          Стоимость
          <div>
            <input
              type="number"
              min={0}
              placeholder="от"
              value={filters["fromPrice"]}
              onChange={(e) => filterFromTo(e.target.value, "fromPrice")}
            />
            <input
              type="number"
              min={0}
              placeholder="до"
              value={filters["toPrice"]}
              onChange={(e) => filterFromTo(e.target.value, "toPrice")}
            />
          </div>
        </div>
        <div>
          Площадь
          <div>
            <input
              type="number"
              min={0}
              placeholder="от"
              value={filters["fromArea"]}
              onChange={(e) => filterFromTo(e.target.value, "fromArea")}
            />
            <input
              type="number"
              min={0}
              placeholder="до"
              value={filters["toArea"]}
              onChange={(e) => filterFromTo(e.target.value, "toArea")}
            />
          </div>
        </div>
        <div>
          <Switch checked={dop} onChange={() => setDop(!dop)} />
          Дополнительные параметры
          {dop && (
            <div>
              Площадь кухни
              <div>
                <input
                  type="number"
                  min={0}
                  placeholder="от"
                  value={filters["fromAreaKitchen"]}
                  onChange={(e) =>
                    filterFromTo(e.target.value, "fromAreaKitchen")
                  }
                />
                <input
                  type="number"
                  min={0}
                  placeholder="до"
                  value={filters["toAreaKitchen"]}
                  onChange={(e) =>
                    filterFromTo(e.target.value, "toAreaKitchen")
                  }
                />
              </div>
              Жилая площадь
              <div>
                <input
                  type="number"
                  min={0}
                  placeholder="от"
                  value={filters["fromAreaLive"]}
                  onChange={(e) => filterFromTo(e.target.value, "fromAreaLive")}
                />
                <input
                  type="number"
                  min={0}
                  placeholder="до"
                  value={filters["toAreaLive"]}
                  onChange={(e) => filterFromTo(e.target.value, "toAreaLive")}
                />
              </div>
              Этаж
              <div>
                <input
                  type="number"
                  min={0}
                  placeholder="от"
                  value={filters["fromFloor"]}
                  onChange={(e) => filterFromTo(e.target.value, "fromFloor")}
                />
                <input
                  type="number"
                  min={0}
                  placeholder="до"
                  value={filters["toFloor"]}
                  onChange={(e) => filterFromTo(e.target.value, "toFloor")}
                />
              </div>
            </div>
          )}
        </div>
        <button onClick={() => restart()}>Сбросить</button>
      </div>
      {notFound ? (
        <div className="flat_card">{notFound}</div>
      ) : (
        <>
          {flatsPage?.map((data) => (
            <FlatCard key={data.id} data={data} />
          ))}
          <Pagination
            count={count ? count : 0}
            page={page}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
};

export default Main;
