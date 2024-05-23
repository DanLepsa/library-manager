import axios from "axios";
import useSWR from "swr";
import { Book, BookFormDataType } from "../types";

export const BASE_URL = "http://localhost:3001";

export const customFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

export const useGetBooks = () => {
  const {
    data: books,
    mutate,
    error,
  } = useSWR<Book[]>(`${BASE_URL}/books`, customFetcher, {
    revalidateOnFocus: false,
  });

  return {
    books,
    mutate,
    error,
  };
};

export const deleteBook = async (bookId: number) => {
  try {
    await axios.delete(`${BASE_URL}/books/${bookId}`);
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const editBook = async (data: BookFormDataType) => {
  try {
    await axios.put(`${BASE_URL}/books/${data.id}`, data);
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const createBook = async (data: BookFormDataType) => {
  try {
    await axios.post(`${BASE_URL}/books`, data);
    return true;
  } catch (error) {
    console.error(error);
  }
};
