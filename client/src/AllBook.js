import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { getBook } from "./query";
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
    marginBottom: "2rem",
  },
}));

export default function AllBook() {
  const classes = useStyles();
  const [shelfNumber, setShelfNumber] = useState("");
  const [books, setBooks] = useState([]);

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

  const listBooks = () => books.map((ele, index) => <li key={index}> {ele} </li>);

  return (
    <Container className={classes.container}>
      <TextField
        className={classes.input}
        id="standard-basic"
        label="Shelf Number"
        value={shelfNumber}
        onChange={getBooks}
      />
      {listBooks()}
    </Container>
  );
}
