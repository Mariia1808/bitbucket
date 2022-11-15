import "../css.css";
import React, { useEffect, useState } from "react";
import { getAll } from "../http/API_flat";
import FlatCard from "../component/FlatCard";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";

const Main = () => {
  const [flats, setFlats] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const [nameFilter, setNameFilter] = useState("")
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
    orderBy: "",
    sort: "ASC",
  });
  const [dop, setDop] = useState(false);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setFlats([]);
    setError("");
    setLoading(true);
    getAll({ ...filters }, 8, page)
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setFlats(data.rows);
          setCount(Math.ceil(data.count / 8));
        }
      })
      .finally(setLoading(false));
  }, [page, filters]);

  const filterFromTo = (value, what) => {
    setFilters((prevState) => ({ ...prevState, [what]: value }));
  };

  const restart = () => {
    setNameFilter('')
    setFilters({
      fromPrice: "",
      fromArea: "",
      fromAreaKitchen: "",
      fromFloor: "",
      fromAreaLive: "",
      fromRoom: "",
      toRoom: "",
      toArea: "",
      toAreaLive: "",
      toAreaKitchen: "",
      toPrice: "",
      toFloor: "",
      orderBy: "",
      sort: "",
    });
  };

  const UpPrice = () => {
    filterFromTo("price", "orderBy");
    filterFromTo("ASC", "sort");
    setNameFilter("По возрастанию цены")
  };
  const DownPrice = () => {
    filterFromTo("price", "orderBy");
    filterFromTo("DESC", "sort");
    setNameFilter("По убыванию цены")
  };
  const UpArea = () => {
    filterFromTo("area_total", "orderBy");
    filterFromTo("ASC", "sort");
    setNameFilter("По возрастанию площади")
  };
  const DownArea = () => {
    filterFromTo("area_total", "orderBy");
    filterFromTo("DESC", "sort");
    setNameFilter("По убыванию площади")
  };

  return (
    <div className="main">
      <div className="filter">
        <div>
          <button onClick={() => UpPrice()}>По возрастанию цены</button>
          <button onClick={() => DownPrice()}>По убыванию цены</button>
          <button onClick={() => UpArea()}>По возрастанию площади</button>
          <button onClick={() => DownArea()}>По убыванию площади</button>
        </div>
        <div>
          Кол-во комнат
          <div>
            <input
              type="number"
              min={0}
              placeholder="от"
              value={filters["fromRoom"]}
              onChange={(e) => filterFromTo(e.target.value, "fromRoom")}
            />
            <input
              type="number"
              min={0}
              placeholder="до"
              value={filters["toRoom"]}
              onChange={(e) => filterFromTo(e.target.value, "toRoom")}
            />
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
        <button onClick={() => restart()}>Сбросить все</button>
      </div>
      {nameFilter && <div className="flat_card">{nameFilter}</div>}
      {error && <div className="flat_card">{error}</div>}
      {loading && <div className="flat_card"><CircularProgress /></div>}
      <div className="flats_cards">
        {flats?.map((data) => (
          <FlatCard key={data.id} data={data} />
        ))}
      </div>
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default Main;
