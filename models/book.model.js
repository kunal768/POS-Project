const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({

    name : {
        type : String,
        unique : true,
        required: true,
    },

    author : {
        type : String,
        required : true,   
    },


    genre :{
        type : String,
        required : true  
    },

    shelf : {
        type : mongoose.Schema.ObjectId,
        ref : "Shelf",
        required : true
    },

    available : {
        type  : Boolean,
        required : true,
    }


})

module.exports = mongoose.model("Book",BookSchema)
