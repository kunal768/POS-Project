import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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

export default function AssignTask() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [shelfNumber, setShelfNumber] = useState("");
  const [success, setSuccess] = useState("");

  const doAssignTask = async () => {
    setSuccess("Task Assigned Successfully");
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
        <Button variant="contained" color="primary" onClick={doAssignTask}>
          Assign Task
        </Button>
      </form>
    </Container>
  );
}
