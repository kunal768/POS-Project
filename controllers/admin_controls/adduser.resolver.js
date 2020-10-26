const User = require('../../models/user.model')
const logger = require('../../utils/logger')
const shelfModel = require('../../models/shelf.model')

exports.add_user = async(_, args) => {
        /*
        input : username, password, user_type, shelf_number(Nan for non staff member)
        descr : creates user in the database
        returns : username, user_type
        */

    let fields = {}
    if(args.input.username == null){
         return `Enter username`
    }
    if(args.input.password == null) {
        return `Enter password`
    }
    if(isNaN(args.input.user_type) || args.input.user_type < 0 || args.input.user_type > 2){
        return `Invalid user type`
    }
    if(args.input.shelf_number > 10 || args.input.shelf_number < 0){
        return `Invalid shelf number`
    }

    fields.username = args.input.username
    fields.password = args.input.password
    fields.user_type = args.input.user_type
    const shelf = await shelfModel.findOne( { shelf_number : args.input.shelf_number }, { new : true }, { upsert : false } ) 
    if(!shelf){
        var shelve = new shelfModel({ shelf_number : args.input.shelf_number })
        await shelve.save()
        fields.inchargeof = shelve 
    } else {
        fields.inchargeof = shelf
    }
    
    await User(fields).save()

    return { name : args.input.username, type : args.input.user_type }
}





