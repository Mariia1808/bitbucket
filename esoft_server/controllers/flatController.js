require('dotenv').config()
const { Flats } = require('../models/models');

class FlatController { 
    async getAll(req, res){
        const types = await Flats.findAll()
        return res.json(types)
    }
    async getOne(req, res){
        const {id} = req.params
        const types = await Flats.findOne(
            {where:{id}}
        )
        return res.json(types)
    }
}

module.exports = new FlatController()