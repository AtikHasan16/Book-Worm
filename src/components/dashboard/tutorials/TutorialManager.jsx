"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Plus, Trash2, Youtube, TriangleAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import useAxios from "@/hooks/useAxios";

const TutorialManager = ({ initialTutorials = [] }) => {
  const [tutorials, setTutorials] = useState(initialTutorials);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tutorialToDelete, setTutorialToDelete] = useState(null);

  const axiosInstance = useAxios();

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleAddTutorial = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const videoId = getYouTubeId(newUrl);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/tutorials", {
        title: newTitle,
        videoUrl: newUrl,
      });
      const newTutorial = {
        _id: response.data.insertedId,
        title: newTitle,
        videoUrl: newUrl,
      };

      setTutorials((prev) => [newTutorial, ...prev]);
      setNewTitle("");
      setNewUrl("");
      toast.success("Tutorial added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add tutorial");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setTutorialToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!tutorialToDelete) return;

    try {
      await axiosInstance.delete(`/tutorials/${tutorialToDelete}`);
      setTutorials((prev) => prev.filter((t) => t._id !== tutorialToDelete));
      toast.success("Tutorial deleted");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete tutorial");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header & Add Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-6 border-b border-bookNavy/5">
        <div className="lg:max-w-md">
          <h1 className="text-3xl font-bold font-fraunses text-bookNavy">
            Manage Tutorials
          </h1>
          <p className="text-bookNavy/60 font-dm-sans mt-2">
            Curate a list of helpful video tutorials for your community.
          </p>
        </div>

        <Card className="w-full lg:w-auto flex-1 bg-white/50 backdrop-blur-sm border border-bookNavy/5">
          <CardBody>
            <form
              onSubmit={handleAddTutorial}
              className="flex flex-col md:flex-row gap-4"
            >
              <Input
                label="Video Title"
                placeholder="e.g. How to read faster"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
                className="flex-1"
              />
              <Input
                label="YouTube URL"
                placeholder="https://youtu.be/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-bookNavy text-paper font-bold h-auto py-3 md:py-0"
                startContent={<Plus />}
                isLoading={loading}
              >
                Add Video
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {tutorials.map((tutorial) => {
            const videoId = getYouTubeId(tutorial.videoUrl);
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              : "";

            return (
              <motion.div
                key={tutorial._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="h-full bg-white border border-bookNavy/5 hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video w-full overflow-hidden bg-black/10">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={tutorial.title}
                        classNames={{
                          wrapper: "w-full h-full",
                          img: "w-full h-full object-cover",
                        }}
                        radius="none"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Youtube className="text-gray-400" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        className="absolute top-2 right-2 shadow-lg"
                        onPress={() => handleDeleteClick(tutorial._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <CardBody className="p-4">
                    <h3
                      className="font-bold text-bookNavy line-clamp-2"
                      title={tutorial.title}
                    >
                      {tutorial.title}
                    </h3>
                    <a
                      href={tutorial.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-bookNavy/50 mt-2 truncate block hover:text-primary transition-colors"
                    >
                      {tutorial.videoUrl}
                    </a>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {tutorials.length === 0 && (
          <div className="col-span-full py-20 text-center text-bookNavy/40 bg-bookNavy/5 rounded-2xl border-2 border-dashed border-bookNavy/10">
            <Youtube size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-medium">No tutorials added yet.</p>
            <p className="text-sm">Add your first YouTube link above!</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
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
                  Delete Tutorial?
                </span>
              </ModalHeader>
              <ModalBody className="text-center px-8">
                <p className="text-bookNavy/60 font-dm-sans">
                  Are you sure you want to remove this video from the
                  collection?
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

export default TutorialManager;
