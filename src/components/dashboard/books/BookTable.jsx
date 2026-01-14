"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tooltip, Chip, Avatar } from "@heroui/react";
import { Edit, Trash2, MoreVertical } from "lucide-react";

const BookTable = ({ books, onEdit, onDelete }) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-bookNavy/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bookNavy/5 text-bookNavy border-b border-bookNavy/10">
              <th className="p-4 font-fraunses font-bold text-lg">Cover</th>
              <th className="p-4 font-fraunses font-bold text-lg">
                Title & Author
              </th>
              <th className="p-4 font-fraunses font-bold text-lg hidden md:table-cell">
                Genre
              </th>
              <th className="p-4 font-fraunses font-bold text-lg text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bookNavy/5">
            <AnimatePresence mode="popLayout">
              {books.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={4} className="p-8 text-center text-bookNavy/40">
                    No books found. Add one to get started!
                  </td>
                </motion.tr>
              ) : (
                books.map((book) => (
                  <motion.tr
                    key={book._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="hover:bg-bookNavy/5 transition-colors group"
                  >
                    <td className="p-4 w-24">
                      <Avatar
                        src={book.coverImage}
                        radius="sm"
                        className="w-16 h-24 object-cover shadow-sm bg-bookNavy/10"
                        fallback={
                          <div className="w-full h-full bg-bookNavy/10 flex items-center justify-center text-xs">
                            No Cover
                          </div>
                        }
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-bookNavy text-lg leading-tight line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-bookNavy/60 text-sm font-medium">
                          {book.author}
                        </p>
                        <div className="md:hidden mt-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-shelfWood/10 text-shelfWood font-bold"
                          >
                            {book.genre}
                          </Chip>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell align-middle">
                      <Chip
                        size="md"
                        variant="flat"
                        className="bg-shelfWood/10 text-shelfWood font-bold uppercase tracking-wider"
                      >
                        {book.genre}
                      </Chip>
                    </td>
                    <td className="p-4 text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                        <Tooltip content="Edit Book">
                          <Button
                            isIconOnly
                            variant="light"
                            className="text-bookNavy/60 hover:text-bookNavy"
                            onPress={() => onEdit(book)}
                          >
                            <Edit size={20} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete Book" color="danger">
                          <Button
                            isIconOnly
                            variant="light"
                            className="text-danger/60 hover:text-danger"
                            onPress={() => onDelete(book._id)}
                          >
                            <Trash2 size={20} />
                          </Button>
                        </Tooltip>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
