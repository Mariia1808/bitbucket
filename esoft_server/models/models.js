const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { types } = require('pg')

const Flats = sequelize.define('datas_flats',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.INTEGER, allowNull: false},
    pos_on_floor: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rooms: {type: DataTypes.INTEGER, allowNull: false},
    area_total: {type: DataTypes.FLOAT, allowNull: false},
    area_kitchen: {type: DataTypes.FLOAT, allowNull: false},
    area_live: {type: DataTypes.FLOAT, allowNull: false},
    layout_image: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {
    Flats
}