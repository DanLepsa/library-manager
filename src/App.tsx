import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid } from "@mui/material";

import { Book, BookFormDataType } from "./types";
import { BookCard } from "./components/BookCard";
import { BookForm } from "./components/BookForm";
import { createBook, deleteBook, editBook, useGetBooks } from "./api";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedBookData, setSelectedBookData] = useState<Book | null>(null);
  const { books, mutate, error } = useGetBooks();

  const handleDelete = async (bookId: number) => {
    deleteBook(bookId).then(() => mutate());
  };

  const renderBooks = () => {
    return books?.map((book) => (
      <BookCard
        key={book.id}
        id={book.id}
        author={book.author}
        name={book.name}
        description={book.description}
        onDelete={handleDelete}
        onEdit={() => {
          setSelectedBookData(book);
          setIsDialogOpen(true);
        }}
      />
    ));
  };

  const handleSubmit = async (data: BookFormDataType) => {
    if (data.id) {
      // edit
      editBook(data).then(() => mutate());
      return;
    }

    // create
    createBook(data).then(() => mutate());
    return;
  };

  return (
    <Box height="100vh">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ m: 2 }}
        onClick={() => setIsDialogOpen(true)}
      >
        Add new book
      </Button>
      <Grid container spacing={2} ml={1}>
        {error ? "An error occured loading data" : renderBooks()}
      </Grid>
      {isDialogOpen && (
        <BookForm
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedBookData(null);
          }}
          initialData={selectedBookData}
          onHandleSubmit={handleSubmit}
        />
      )}
    </Box>
  );
}

export default App;
