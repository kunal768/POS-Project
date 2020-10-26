const User = require('../../models/user.model')
const logger = require('../../utils/logger')

exports.delete_user = async (_, args) => {
    let username = args.input.username
    let user_type = args.input.user_type
    let user = await User.findOne({username : username})
    if(!user) {
        logger.error(`No user with username ${username} found in the database!`)
        throw new Error("User not found")
    }
    if (username == null){
        logger.info(`Inadequate Data`)
        throw new Error("Inadequate Data")
    } else {
        if (user_type < 0 || user_type > 2){
            logger.info(`Invalid user type !`)
            throw new Error("Invalid User Type")
        }
        else{
            await User.findOneAndRemove({username : username})
            return `User deleted : ${username}`            
            }
    }
}

