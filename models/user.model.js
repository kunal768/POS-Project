const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type :String,
        required : true 
    },
    password : {
        type : String,
        required : true,
    },
    user_type : {
        type : Number,
        min : 0,
        max : 2,
        required : true,
    },
    // incase user is a staff member he will be assigned with a shelf-managing task
    // this is a one to one model relationship 
    inchargeof : {
        type : mongoose.Schema.ObjectId,
        ref : 'Shelf',
        default : null,
    },

    borrow_count : {
        type : Number, 
        default : 0
    }, 

    active_borrows : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Book',
        }
    ]

})



module.exports = mongoose.model('User',UserSchema)
