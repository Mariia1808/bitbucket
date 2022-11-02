require("dotenv").config();
const { Flats } = require("../models/models");

class FlatController {
  async getAll(req, res) {
    const data = await Flats.findAll();
    return res.json(data);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const data = await Flats.findOne({ where: { id } });
    return res.json(data);
  }
}
module.exports = new FlatController();
