const User = require('../../models/user.model')
const logger = require("../../utils/logger")

exports.return_userlist = async(_, args) => {
    /*
    @function description 
    - i/p : user_type (0 - admin, 1 - staff, 2 - member)
    - o/p : returns a list of usernames of a particular type
    */
   let response = []
   if(args.input.user_type == null || isNaN(args.input.user_type) || args.input.user_type < 0 || args.input.user_type > 2){
       throw new Error(`User type ${args.input.user_type} is invalid`)
   }
   
    const users = await User.find({ user_type : args.input.user_type })
    users.forEach( (elem) => {
        response.push(elem.username)
    })
    return response
}