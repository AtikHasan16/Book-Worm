import React from "react";
import BookDetailsClient from "@/components/user/books/BookDetailsClient";
import { notFound } from "next/navigation";

const getBook = async (id) => {
  try {
    const res = await fetch(
      `https://bw-server-seven.vercel.app/api/books/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error loading book:", error);
    return null;
  }
};

const getReviews = async (id) => {
  try {
    const res = await fetch(
      `https://bw-server-seven.vercel.app/api/reviews/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error loading reviews:", error);
    return [];
  }
};

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBook(id);
  const reviews = await getReviews(id);

  if (!book) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-paper pb-20 pt-8">
      <BookDetailsClient book={book} initialReviews={reviews} />
    </div>
  );
};

export default BookDetailsPage;
