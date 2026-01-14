"use client";
import React, { useState } from "react";
import { Button, Input, Card, CardBody, Chip, Tooltip } from "@heroui/react";
import { Plus, Edit2, Check, X, Trash2, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import useAxios from "@/hooks/useAxios";

const GenreManager = ({ initialGenres = [] }) => {
  const [genres, setGenres] = useState(initialGenres);
  const [newGenre, setNewGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const axiosInstance = useAxios();

  const handleAddGenre = async (e) => {
    e.preventDefault();
    if (!newGenre.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/genres", { name: newGenre });
      // Insert with the ID from backend
      const newGenreObj = { _id: response.data.insertedId, name: newGenre };

      // Add to local state (sorted alphabetically roughly, or just append)
      // Ideally we would resort but appending is fine for immediate feedback
      setGenres((prev) =>
        [...prev, newGenreObj].sort((a, b) => a.name.localeCompare(b.name))
      );

      setNewGenre("");
      toast.success("Genre added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add genre");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (genre) => {
    setEditingId(genre._id);
    setEditValue(genre.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = async (id) => {
    if (!editValue.trim()) return;

    try {
      await axiosInstance.patch(`/genres/${id}`, { name: editValue });

      setGenres((prev) =>
        prev.map((g) => (g._id === id ? { ...g, name: editValue } : g))
      );

      setEditingId(null);
      toast.success("Genre updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update genre");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this genre?")) return;

    try {
      await axiosInstance.delete(`/genres/${id}`);
      setGenres((prev) => prev.filter((g) => g._id !== id));
      toast.success("Genre deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete genre");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header & Add Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-bookNavy/5">
        <div>
          <h1 className="text-3xl font-bold font-fraunses text-bookNavy">
            Manage Genres
          </h1>
          <p className="text-bookNavy/60 font-dm-sans mt-1">
            Add or edit book categories
          </p>
        </div>

        <form onSubmit={handleAddGenre} className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="New Genre Name"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            className="lg:w-64"
            classNames={{
              inputWrapper:
                "bg-white border hover:bg-white focus-within:bg-white",
            }}
            variant="bordered"
            size="lg"
          />
          <Button
            type="submit"
            isIconOnly
            className="bg-bookNavy text-paper"
            size="lg"
            isLoading={loading}
          >
            <Plus />
          </Button>
        </form>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {genres.map((genre) => (
            <motion.div
              key={genre._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border border-bookNavy/5 shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-4 flex flex-row items-center justify-between gap-3">
                  {editingId === genre._id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        size="sm"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                        classNames={{ inputWrapper: "bg-white" }}
                      />
                      <div className="flex gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          color="success"
                          variant="flat"
                          onPress={() => saveEdit(genre._id)}
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="flat"
                          onPress={cancelEdit}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Chip
                          variant="dot"
                          color="primary"
                          className="border-none"
                        >
                          <span className="font-semibold text-lg text-bookNavy">
                            {genre.name}
                          </span>
                        </Chip>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tooltip content="Edit Name">
                          <Button
                            isIconOnly
                            size="sm"
                            color="success"
                            onPress={() => startEdit(genre)}
                          >
                            <Edit2 size={16} className="text-bookNavy" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete Genre" color="danger">
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            onPress={() => handleDelete(genre._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </Tooltip>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {genres.length === 0 && (
          <div className="col-span-full text-center py-12 text-bookNavy/40">
            No genres found. Add one above!
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreManager;
