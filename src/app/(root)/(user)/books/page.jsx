import React from "react";
import BookCatalog from "@/components/user/books/BookCatalog";

const getBooks = async () => {
  try {
    const res = await fetch("http://localhost:2000/api/books", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading books:", error);
    return [];
  }
};

const getGenres = async () => {
  try {
    const res = await fetch("http://localhost:2000/api/genres", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch genres");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading genres:", error);
    return [];
  }
};

const BrowseBooksPage = async () => {
  const books = await getBooks();
  const genres = await getGenres();

  return (
    <div className="min-h-screen bg-paper pb-20 pt-4">
      <BookCatalog initialBooks={books} genres={genres} />
    </div>
  );
};

export default BrowseBooksPage;
