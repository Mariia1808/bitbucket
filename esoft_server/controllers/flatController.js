require("dotenv").config();
const { Op, and } = require("sequelize");
const { Flats } = require("../models/models");

class FlatController {
  async getAll(req, res) {
    try {
      let { filter, limit, page } = req.body;
      page = page || 1;
      limit = limit || 12;
      let offset = page * limit - limit;
      let data;

      if (!filter.orderBy) {
        data = await Flats.findAndCountAll({
          where: and(
            { price: { [Op.gte]: Number(filter.fromPrice) } },
            { floor: { [Op.gte]: Number(filter.fromFloor) } },
            { area_total: { [Op.gte]: Number(filter.fromArea) } },
            { area_kitchen: { [Op.gte]: Number(filter.fromAreaKitchen) } },
            { area_live: { [Op.gte]: Number(filter.fromAreaLive) } },
            { price: { [Op.lte]: Number(filter.toPrice || 1000000000) } },
            { floor: { [Op.lte]: Number(filter.toFloor || 1000000000) } },
            { area_total: { [Op.lte]: Number(filter.toArea || 1000000000) } },
            {
              area_kitchen: {
                [Op.lte]: Number(filter.toAreaKitchen || 1000000000),
              },
            },
            {
              area_live: { [Op.lte]: Number(filter.toAreaLive || 1000000000) },
            },
            { rooms: { [Op.gte]: Number(filter.fromRoom || 0)  } },
            { rooms: { [Op.lte]: Number(filter.toRoom || 100) } }
          ),
          limit,
          offset,
        });
      }
      if (filter.orderBy) {
        data = await Flats.findAndCountAll({
          where: and(
            { price: { [Op.gte]: Number(filter.fromPrice) } },
            { floor: { [Op.gte]: Number(filter.fromFloor) } },
            { area_total: { [Op.gte]: Number(filter.fromArea) } },
            { area_kitchen: { [Op.gte]: Number(filter.fromAreaKitchen) } },
            { area_live: { [Op.gte]: Number(filter.fromAreaLive) } },
            { rooms: { [Op.gte]: Number(filter.fromRoom  || 0) } },
            { rooms: { [Op.lte]: Number(filter.toRoom || 100) } },
            { price: { [Op.lte]: Number(filter.toPrice || 1000000000) } },
            { floor: { [Op.lte]: Number(filter.toFloor || 1000000000) } },
            { area_total: { [Op.lte]: Number(filter.toArea || 1000000000) } },
            {
              area_kitchen: {
                [Op.lte]: Number(filter.toAreaKitchen || 1000000000),
              },
            },
            { area_live: { [Op.lte]: Number(filter.toAreaLive || 1000000000) } }
          ),
          order: [[filter.orderBy, filter.sort]],
          limit,
          offset,
        });
      }

      if (data.count === 0) {
        return res.json({ message: "Ничего не найдено" });
      }
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ message: "Некорректные данные" });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await Flats.findOne({ where: { id } });
      if (data.length === 0) {
        return res.json({ message: "Ничего не найдено" });
      }
      return res.json(data);
    } catch (error) {
      return res.json({ message: "Некорректные данные" });
    }
  }
}
module.exports = new FlatController();
