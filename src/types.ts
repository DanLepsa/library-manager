export type Book = {
  id: number;
  name: string;
  author: string;
  description: string;
};

export type BookFormDataType = Omit<Book, "id"> & { id: null | number };
