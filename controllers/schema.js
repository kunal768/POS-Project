const { gql } = require('apollo-server')

exports.typeDefs = gql(`
    type Mutation {
        add_user(input : user_details) : Response!
        delete_user(input : delete_details) : String
        assign_task(input : shelf_details) : String
        add_book(input : book_details) : book_response
        rent_book(input : rent_details) : String
        return_book(input : rent_details) : String
     }
    input user_details {
        username : String!
        password : String!
        user_type : Int!
        shelf_number : Int
    }
    
    input shelf_details {
        username : String!
        user_type : Int!
        shelf_number : Int!
    }

    input book_details{
        name : String!
        author : String!
        genre : String!
        shelf : Int!
        available : Boolean!
    }

    input delete_details {
        username : String!
        user_type : Int!
    }

    input rent_details {
        username : String!
        book : String!
    }

    type Query {
        dummy : String!
    }

    type book_response {
        name : String!
        author : String!
        genre : String!
        shelf : Int!
        available : Boolean!
    }

    
    type Response{
        name : String!
        type : Int!
    }

`);


