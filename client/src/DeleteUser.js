import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { postRequest } from "./networkCall";
import { getUser } from "./query";
import { deleteUser } from "./mutation";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  input: {
    width: "20rem",
  },
}));

export default function DeleteUser() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState("");

  const getAllUsers = async (e) => {
    setUserType(e.target.value);
    if (e.target.value.length === 0) return;
    const query = getUser({ userType: e.target.value });
    const result = await postRequest(query);
    const { data } = result;
    if (data) {
      const { data: userData } = data;
      if (data) {
        const { return_userlist } = userData;
        setUsers(return_userlist);
      }
    }
  };

  const doDeleteUser = async () => {
    const mutation = deleteUser({ username: user, userType: userType });
    await postRequest(mutation);
    setSuccess("User deleted");
  };

  const generateMenu = () =>
    users.map((ele, index) => (
      <MenuItem key={index} value={ele}>
        {ele}
      </MenuItem>
    ));

  return (
    <Container className={classes.container}>
      <h4>{success}</h4>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          className={classes.input}
          id="standard-basic"
          label="User Type"
          value={userType}
          onChange={getAllUsers}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Username</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          >
            {generateMenu()}
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={doDeleteUser}>
          Delete User
        </Button>
      </form>
    </Container>
  );
}
