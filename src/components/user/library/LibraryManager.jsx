"use client";
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Book,
  TriangleAlert,
} from "lucide-react";
import ShelfCard from "./ShelfCard";
import { toast } from "sonner";
import useAxios from "@/hooks/useAxios";
import Link from "next/link"; // Changed from 'next/link' (default import) to named if needed, but 'next/link' is correct.
import { AnimatePresence } from "framer-motion";

const LibraryManager = ({ initialShelfItems = [] }) => {
  const [items, setItems] = useState(initialShelfItems);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const axiosInstance = useAxios();
  console.log(items);

  const handleUpdate = async (id, updates) => {
    try {
      await axiosInstance.patch(`/shelves/${id}`, updates);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...updates } : item))
      );
      toast.success("Shelf updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update shelf");
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await axiosInstance.delete(`/shelves/${itemToDelete}`);
      setItems((prev) => prev.filter((item) => item._id !== itemToDelete));
      toast.success("Book removed from library");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove book");
    }
  };

  const shelves = [
    { id: "Want to Read", label: "Want to Read", icon: BookOpen },
    { id: "Currently Reading", label: "Reading", icon: Clock },
    { id: "Read", label: "Read", icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 px-1">
        <div>
          <h1 className="text-4xl font-bold font-fraunses text-bookNavy">
            My Library
          </h1>
          <p className="text-bookNavy/60 font-dm-sans mt-2">
            Your personal collection. Digital shelves for your reading journey.
          </p>
        </div>
        <Link href="/books">
          <Button
            variant="flat"
            color="primary"
            startContent={<Book size={18} />}
            className="font-bold"
          >
            Browse More Books
          </Button>
        </Link>
      </div>

      <Tabs
        aria-label="Library Shelves"
        variant="underlined"
        color="primary"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent:
            "group-data-[selected=true]:text-primary group-data-[selected=true]:font-bold text-bookNavy/60 font-medium",
        }}
      >
        {shelves.map((shelf) => (
          <Tab
            key={shelf.id}
            title={
              <div className="flex items-center space-x-2">
                <shelf.icon size={18} />
                <span>{shelf.label}</span>
                <span className="ml-1 bg-bookNavy/5 text-bookNavy/60 px-2 py-0.5 rounded-full text-xs">
                  {items.filter((i) => i.shelf === shelf.id).length}
                </span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <AnimatePresence mode="popLayout">
                {items
                  .filter((i) => i.shelf === shelf.id)
                  .map((item) => (
                    <React.Fragment key={item._id}>
                      <ShelfCard
                        item={item}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
                    </React.Fragment>
                  ))}
              </AnimatePresence>

              {items.filter((i) => i.shelf === shelf.id).length === 0 && (
                <div className="col-span-full py-20 text-center text-bookNavy/40 bg-bookNavy/5 rounded-2xl border-2 border-dashed border-bookNavy/10">
                  <shelf.icon size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium">This shelf is empty.</p>
                  <p className="text-sm">Find books to add from the catalog!</p>
                </div>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>

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
                  Remove from Library?
                </span>
              </ModalHeader>
              <ModalBody className="text-center px-8">
                <p className="text-bookNavy/60 font-dm-sans">
                  Are you sure you want to remove this book? Your reading
                  progress will be lost.
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
                  Yes, Remove It
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LibraryManager;
