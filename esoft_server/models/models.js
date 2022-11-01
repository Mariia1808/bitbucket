const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { types } = require('pg')

const Flats = sequelize.define('flats_data',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.INTEGER, allowNull: false},
    pos_on_floor: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.CHAR, allowNull: false},
    rooms: {type: DataTypes.INTEGER, allowNull: false},
    area_total: {type: DataTypes.CHAR, allowNull: false},
    area_kitchen: {type: DataTypes.CHAR, allowNull: false},
    area_live: {type: DataTypes.CHAR, allowNull: false},
    layout_image: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {
    Flats
}