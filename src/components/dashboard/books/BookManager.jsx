"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Plus, TriangleAlert } from "lucide-react";
import BookTable from "./BookTable";
import BookForm from "./BookForm";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";

const BookManager = ({ initialBooks = [], initialGenres = [] }) => {
  // console.log(initialGenres);

  const [books, setBooks] = useState(initialBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const axiosInstance = useAxios();

  const handleAddBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      await axiosInstance.delete(`/books/${bookToDelete}`);
      setBooks((prev) => prev.filter((book) => book._id !== bookToDelete));
      toast.success("Book deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingBook) {
        // Update
        const response = await axiosInstance.patch(
          `/books/${editingBook._id}`,
          formData
        );
        const updatedBook = { ...editingBook, ...formData };
        setBooks((prev) =>
          prev.map((book) =>
            book._id === editingBook._id ? updatedBook : book
          )
        );
        toast.success("Book updated successfully");
      } else {
        // Create
        const response = await axiosInstance.post("/books", formData);
        const newBook = { ...formData, _id: response.data.insertedId };
        setBooks((prev) => [newBook, ...prev]);
        toast.success("Book added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-fraunses text-bookNavy">
            Manage Books
          </h1>
          <p className="text-bookNavy/60 font-dm-sans mt-2">
            Add, update, and manage your library inventory.
          </p>
        </div>
        <Button
          className="bg-bookNavy text-paper font-bold shadow-lg hover:shadow-xl hover:bg-bookNavy/90 transition-all font-dm-sans"
          startContent={<Plus size={20} />}
          size="lg"
          onPress={handleAddBook}
        >
          Add New Book
        </Button>
      </div>

      {/* Main Content */}
      <BookTable
        books={books}
        onEdit={handleEditBook}
        onDelete={handleDeleteClick}
        genres={initialGenres}
      />

      {/* Add/Edit Modal Form */}
      <BookForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingBook}
        genres={initialGenres}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        backdrop="blur"
        placement="center"
        className="bg-paper"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center text-center pt-8">
                <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-2 text-danger">
                  <TriangleAlert size={32} />
                </div>
                <span className="text-2xl font-fraunses font-bold text-bookNavy">
                  Delete Book?
                </span>
              </ModalHeader>
              <ModalBody className="text-center px-8">
                <p className="text-bookNavy/60 font-dm-sans">
                  Are you sure you want to delete this book? This action cannot
                  be undone and the book will be removed directly from your
                  library.
                </p>
              </ModalBody>
              <ModalFooter className="justify-center pb-8 pt-4">
                <Button
                  color="default"
                  variant="flat"
                  onPress={onClose}
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={confirmDelete}
                  className="font-bold shadow-lg shadow-danger/20"
                >
                  Yes, Delete It
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookManager;
