const { Mongoose } = require("mongoose")
const bookModel = require("../../models/book.model")
const User = require("../../models/user.model")
const logger = require('../../utils/logger')
const { update } = require("../../models/book.model")

exports.rent_book = async(_, args) => {
    /* 
    @descr 
    input : bookname, username ( of the person who's lending )
    output : the book gets rented ( obviously ) ( sidenote : only if it's available ) 
    internally : books status changes to not available, user's borrow count increases also book gets inserted in active_borrows
    constraints : cant borrow more than 3, user and book both should exist, book should be available 
    */

    try {

    let user = await User.findOne({ username : args.input.username })
    
    if(!user){
        throw new Error(`User does not exist and needs to create an account`)
    } 
    

    /* user borrow_count test check */
    if(user.borrow_count + 1 > 3){
        throw new Error(`User has reached the borrowing limit`)
    }


    let book = await bookModel.findOne({ name : args.input.book })  
    
    if(!book){
        throw new Error(` Book doesn't exist in the library `)
    }

    if(!book.available){
        throw new Error(` Book isn't available for borrow `)
    }

    await user.update( { $push : { active_borrows : book } } )
    await user.update({ $inc : { borrow_count : 1 }} )
    await book.update( { $set : { available : false } })


    

    return `User ${args.input.username} has successfully borrowed book : ${args.input.book}`
    }
    
    catch(err) {
        logger.error(err)
    }

}