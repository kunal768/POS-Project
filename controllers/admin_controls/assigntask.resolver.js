const User = require('../../models/user.model')
const shelfModel = require('../../models/shelf.model')
const logger = require('../../utils/logger')

exports.assign_task = async(_, args) => {

    /* assigns a staff member the responsibilty of a shelf 

    input : username, user_type, shelf_number 
    output : the inchargeof parameter of the user must be set to shelf_number  
    contraints : user must be a staff member

    */
   
    let update = {}
    if(! args.input.username) {
        throw new Error('missing username')
    } 

    if(! args.input.shelf_number) {
        throw new Error('missing shelf number')
    }

    if(args.input.user_type){
        if(isNaN(args.input.user_type) || args.input.user_type > 2 || args.input.user_type < 0){
            throw new Error('invalid user type') 
        } else if (args.input.user_type != 1) {
            throw new Error('only staff members are allowed to be incharge')
    } else {
        update.user_type = args.input.user_type
    }
    
    }
    if(args.input.shelf_number){
        if( isNaN(args.input.shelf_number) || args.input.shelf_number < 1 || args.input.shelf_number > 10) {
            throw new Error('invalid shelf number')
        } else {
            const shelf = await shelfModel.findOne( { shelf_number : args.input.shelf_number }, { new : true }, { upsert : false } ) 
            if(!shelf){
                var shelve = new shelfModel({ shelf_number : args.input.shelf_number })
                shelve.incharge = await User.findOne( { username : args.input.username } )
                await shelve.save()
                update.inchargeof = shelve 
            } else {
                await shelf.update( {incharge : User.findOne({ username : args.input.username }) })
                update.inchargeof = shelf
            }
        }
    }

    await User.findOneAndUpdate({ username : args.input.username }, 
    {
        $set : update
    }, 
    { 
        upsert : false 
    })
    
    return `Task was successfully assigned`

}
