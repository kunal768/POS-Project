const addUser = ({ username, password, userType, shelfNumber }) => {
  return `
mutation {
  add_user(
    input: { username: "${username}", password: "${password}", user_type: ${userType}, shelf_number: ${shelfNumber} }
  ) {
    name
    type
  }
}
        `;
};

const deleteUser = ({ username, userType }) =>
  `
  mutation{
    delete_user(input:{username:"${username}", user_type:${userType}})
  }
  `;

const addBook = ({ name, author, genre, shelfNumber, isAvailable }) =>
  `
  mutation{
    add_book(input:{name:"${name}", author:"${author}", genre:"${genre}", shelf:${shelfNumber}, available:${isAvailable}}){
      name
    }
  }
  `;

const rentBook = ({ username, book }) =>
  `
  mutation{
    rent_book(input:{username:"${username}", book:"${book}"})
  }
  `;

const returnBook = ({ username, book }) =>
  `
  mutation{
    return_book(input:{username:"${username}", book:"${book}"})
  }
  `;

export { addUser, deleteUser, addBook, rentBook, returnBook };
