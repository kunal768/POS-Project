import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Staff } from "./staff";
import { Admin } from "./admin";
import { User } from "./user";
import { userType, userList } from "./users";

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
    marginTop: "10rem",
  },
  input: {
    width: "20rem",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [err, setError] = useState("");

  const doLogin = () => {
    const user = userList.filter(
      (ele) => ele.username === username && ele.password === password
    );
    if (user.length === 0) {
      setError("Wrong Username and Password Combination");
    } else {
      const userInfo = user[0];
      localStorage.setItem("username", userInfo.username);
      localStorage.setItem("usertype", userInfo.usertype);
      window.location.reload();
    }
  };
  const usertype = localStorage.getItem("usertype");
  if (!username || !usertype) {
    return (
      <Container className={classes.container}>
        <h4>{err}</h4>
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
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={doLogin}>
            Login
          </Button>
        </form>
      </Container>
    );
  }
  if (usertype === userType.ADMIN) return <Admin />;
  if (usertype === userType.STAFF) return <Staff />;
  if (usertype === userType.USER) return <User />;
};

export { Login };
