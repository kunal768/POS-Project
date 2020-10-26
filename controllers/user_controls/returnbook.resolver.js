const User = require('../../models/user.model')
const bookModel = require('../../models/book.model')
const logger = require('../../utils/logger')


exports.return_book = async(_, args) => {
    /*
    @descr  
    i/p : username, book 
    o/p : string
    what happens : book is made available in the shelf and is removed from users borrowed books and the borrow count is decreased
    constraints : user and book both exist, pretty much that only
    */
    // try {
        /* Basic Check */
        if(args.input.username == null || args.input.book == null) {
            throw new Error(`Enter values correctly `)
        }
        
        let user = User.findOne({ username : args.input.username })


        if(!user) {
            throw new Error(`User with ${args.input.username} does not exist`)
        }

        let book = bookModel.findOne({ name : args.input.book })

    

        if(!book) {
            throw new Error(`Book with name ${args.input.book} does not exist`)
        }

        /* remove book from users active_borrows and is made available and users borrow count is decreased */
        await user.updateOne( { $pull : { active_borrows : book._id } } )
        await user.updateOne({ $inc : { borrow_count : -1 }} )
        await book.updateOne( { $set : { available : true } })      
        
        return `User ${args.input.username} has successfully returned book : ${args.input.book}`
    // }
//  catch(err){
//  logger.error(err)
//  }
}

