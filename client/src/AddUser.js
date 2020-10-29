import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { addUser } from "./mutation";
import { postRequest } from "./networkCall";

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

export default function AddUser() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [shelfNumber, setShelfNumber] = useState("");
  const [success, setSuccess] = useState("");

  const doAddUser = async () => {
    const mutation = addUser({ username, password, userType, shelfNumber });
    await postRequest(mutation);
    setSuccess("User created successfully");
  };

  return (
    <Container className={classes.container}>
      <h4>{success}</h4>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="standard-basic"
          label="User Type"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Shelf Number"
          value={shelfNumber}
          onChange={(e) => setShelfNumber(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={doAddUser}>
          Create User
        </Button>
      </form>
    </Container>
  );
}
