const { add_user } = require('./admin_controls/adduser.resolver')
const { delete_user } = require('./admin_controls/deleteuser.resolver')
const { assign_task } = require('./admin_controls/assigntask.resolver')
const { add_book } = require('./staff_controls/addbookresolver')
const { rent_book } = require('./user_controls/rentbookresolver')
const { return_book } = require('./user_controls/returnbook.resolver')


module.exports = {
    Mutation : {
        add_user,
        delete_user,
        assign_task,
        add_book,
        rent_book,
        return_book
    }   
};
