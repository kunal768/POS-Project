import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { addBook } from "./mutation";
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

export default function AddBook() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [shelfNumber, setShelfNumber] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [success, setSuccess] = useState("");

  const doAddBook = async () => {
    const mutation = addBook({
      name: name,
      author: author,
      genre: genre,
      shelfNumber: shelfNumber,
      isAvailable: isAvailable,
    });
    await postRequest(mutation);
    setSuccess("Book Added Successfully");
  };

  return (
    <Container className={classes.container}>
      <form className={classes.root} noValidate autoComplete="off">
        <h4>{success}</h4>
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Shelf Number"
          value={shelfNumber}
          onChange={(e) => setShelfNumber(e.target.value)}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Is Available</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value)}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={doAddBook}>
          Add Book
        </Button>
      </form>
    </Container>
  );
}
