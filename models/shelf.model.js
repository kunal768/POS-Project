const mongoose = require('mongoose')

const ShelfSchema = new mongoose.Schema({
    shelf_number : {
        type : Number,
        min : 1,
        max : 10,
    },

    incharge : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
    },

    books : [
        {
        type : mongoose.Schema.ObjectId,
        ref : 'Book',
    }   
],

})

module.exports = mongoose.model('Shelf',ShelfSchema)