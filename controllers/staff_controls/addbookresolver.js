const bookModel = require("../../models/book.model")
const logger = require("../../utils/logger")
const shelfModel = require("../../models/shelf.model")


exports.add_book = async(_, args) => {
    /*
    @descr
    i/p : name, author, genre, shelf, available
    o/p :  name, author, genre, shelf, available
    constraints : No parameter null, shelf number in limits, shouldn't already exist 
    */
        
        /* basic testcases */
        if(!args.input.name || !args.input.author || !args.input.genre) {
            throw new Error(` Kindly fill all details `)
        }

        if(args.input.shelf_number < 1 || args.input.shelf_number > 10) {
            throw new Error(` No shelf with shelf_number ${args.input.shelf_number} exists`)
        }
        
        let shelf_curr = await shelfModel.findOne({ shelf_number : args.input.shelf }, { upsert : false })
        let book = new bookModel({ name : args.input.name, author : args.input.author, shelf : shelf_curr, available : args.input.available , genre : args.input.genre })
        await book.save()
        await shelf_curr.update( { $push : { books : book }})



        let response = {
            name : args.input.name,
            author : args.input.author,
            genre : args.input.genre,
            shelf : args.input.shelf,
            available : args.input.available
        }
        
        return response
    
    }



