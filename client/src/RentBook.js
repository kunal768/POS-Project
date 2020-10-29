import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { getBook } from "./query";
import { postRequest } from "./networkCall";
import { rentBook } from "./mutation";

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

export default function RentBook() {
  const classes = useStyles();
  const [shelfNumber, setShelfNumber] = useState("");
  const [books, setBooks] = useState([]);
  const [bookToRent, setBookToRent] = useState("");
  const [success, setSuccess] = useState("");

  const getBooks = async (event) => {
    setShelfNumber(event.target.value);
    if (event.target.value.length === 0) return;
    const query = getBook({ shelfNumber: event.target.value });
    const result = await postRequest(query);
    const { data } = result;
    if (data) {
      const { data: bookData } = data;
      if (bookData) {
        const { return_booklist } = bookData;
        setBooks(return_booklist);
      }
    }
  };

  const getAllBooks = () =>
    books.map((ele, index) => (
      <MenuItem key={index} value={ele}>
        {ele}
      </MenuItem>
    ));

  const doRentBook = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.reload();
      return;
    }
    const mutation = rentBook({ username: username, book: bookToRent });
    await postRequest(mutation);
    setSuccess("Book Rented Successfully");
  };

  return (
    <Container className={classes.container}>
      <form className={classes.root} noValidate autoComplete="off">
        <h4>{success}</h4>
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Shelf Number"
          value={shelfNumber}
          onChange={getBooks}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Book Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bookToRent}
            onChange={(e) => setBookToRent(e.target.value)}
          >
            {getAllBooks()}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={doRentBook}>
          Rent Book
        </Button>
      </form>
    </Container>
  );
}
