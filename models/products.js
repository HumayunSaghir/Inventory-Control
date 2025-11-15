const mongoose = require('mongoose')
const { type } = require('os')

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    price : {
        type : String,
        required : true,
    },

    stock : {
        type : String,
        default : 0,
    },

    description : {
        type : String,
    },

}, {timestamps : true})

const invModel = new mongoose.model('products', schema)

module.exports = invModel