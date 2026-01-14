"use client";
import React, { useState, useMemo } from "react";
import {
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Image,
  Button,
} from "@heroui/react";
import { Search, Filter, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const BookCard = ({ book }) => {
  return (
    <Link href={`/books/${book._id}`} className="block h-full">
      <Card className="h-full border border-bookNavy/5 hover:shadow-lg transition-all duration-300 group bg-white">
        <CardBody className="p-0 overflow-hidden relative">
          {/* Image Container with Aspect Ratio */}
          <div className="aspect-2/3 w-full relative overflow-hidden bg-paper">
            <Image
              src={book.coverImage}
              alt={book.title}
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              }}
              radius="none"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                className="bg-white/90 text-bookNavy font-bold shadow-lg"
                radius="full"
                variant="flat"
                endContent={<BookOpen size={16} />}
              >
                View Details
              </Button>
            </div>

            {/* Genre Badge */}
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-bold bg-white/90 text-bookNavy backdrop-blur-sm rounded-full shadow-sm">
                {book.genre}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-1">
            <h3
              className="font-bold text-lg text-bookNavy line-clamp-1 group-hover:text-primary transition-colors"
              title={book.title}
            >
              {book.title}
            </h3>
            <p className="text-sm text-bookNavy/60 font-medium">
              {book.author}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

const BookCatalog = ({ initialBooks = [], genres = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;

      return matchesSearch && matchesGenre;
    });
  }, [initialBooks, searchTerm, selectedGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold font-fraunses text-bookNavy mb-2">
            Browse Library
          </h1>
          <p className="text-bookNavy/60 font-dm-sans">
            Discover your next favorite read from our collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input
            placeholder="Search title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<Search className="text-bookNavy/40" size={18} />}
            className="w-full sm:w-64"
            classNames={{ inputWrapper: "bg-white border-bookNavy/10" }}
            variant="bordered"
          />
          <Select
            placeholder="All Genres"
            aria-label="Select genre"
            selectedKeys={selectedGenre ? [selectedGenre] : []}
            onChange={(e) => setSelectedGenre(e.target.value)}
            startContent={<Filter className="text-bookNavy/40" size={18} />}
            className="w-full sm:w-48"
            classNames={{ trigger: "bg-white border-bookNavy/10" }}
            variant="bordered"
          >
            {genres.map((genre) => (
              <SelectItem key={genre.name} value={genre.name}>
                {genre.name}
              </SelectItem>
            ))}
          </Select>
          {(searchTerm || selectedGenre) && (
            <Button
              variant="flat"
              color="danger"
              className="font-bold sm:w-auto w-full"
              onPress={() => {
                setSearchTerm("");
                setSelectedGenre("");
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-white/50 rounded-3xl border border-bookNavy/5">
          <BookOpen size={64} className="mx-auto text-bookNavy/20 mb-4" />
          <h3 className="text-xl font-bold text-bookNavy">No books found</h3>
          <p className="text-bookNavy/60 mt-2">
            Try adjusting your search or filters to find what you are looking
            for.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;
