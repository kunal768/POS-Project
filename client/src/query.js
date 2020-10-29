const getUser = ({ userType }) =>
  `
    query{
        return_userlist(input:{user_type:${userType}})
      }
      `;

const getBook = ({ shelfNumber }) =>
  `
  query{
    return_booklist(input:{shelf_number:${shelfNumber}})
  }
  `;

export { getUser, getBook };
