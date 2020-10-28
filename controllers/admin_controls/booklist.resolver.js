const shelfModel = require('../../models/shelf.model')
const logger = require("../../utils/logger")
const bookModel = require('../../models/book.model')
const mongoose = require('mongoose')


exports.return_booklist = async(_, args) => {
    /*
    @function description 
    - i/p : shelf_number (1 to 10)
    - o/p : returns a list of available books of a shelf
    */
   let response = []
   if(args.input.shelf_number == null || isNaN(args.input.shelf_number) || args.input.shelf_number < 1 || args.input.shelf_number > 10){
       throw new Error(`User type ${args.input.shelf_number} is invalid`)
   }

   let shelf = await shelfModel.findOne({ shelf_number : args.input.shelf_number })
   let books = await bookModel.find({ shelf : shelf , available : true })
   books.forEach( (elem) => {
       response.push(elem.name)
   })
   

    return response
}