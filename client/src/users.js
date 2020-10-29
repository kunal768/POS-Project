const userType = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  USER: "USER",
};

const userList = [
  {
    username: "kunal",
    password: "password",
    usertype: userType.ADMIN,
  },
  {
    username: "test",
    password: "test",
    usertype: userType.STAFF,
  },
  {
    username: "user",
    password: "password",
    usertype: userType.USER,
  },
];

export { userList, userType };
