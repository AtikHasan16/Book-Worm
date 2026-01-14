"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Avatar,
} from "@heroui/react";
import { Upload, Book, User, FileText, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";


const BookForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    coverImage: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        genre: initialData.genre || "",
        description: initialData.description || "",
        coverImage: initialData.coverImage || "",
      });
      setPreview(initialData.coverImage);
    } else {
      setFormData({
        title: "",
        author: "",
        genre: "",
        description: "",
        coverImage: "",
      });
      setPreview(null);
    }
    setImageFile(null);
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      genre: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const image_hosting_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const res = await axios.post(url, formData);
    return res.data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageURL = formData.coverImage;

      // If a new file is implemented, upload it
      if (imageFile) {
        coverImageURL = await uploadImageToImgBB(imageFile);
      } else if (!coverImageURL && !initialData) {
        // If creating new and no image
        toast.error("Please upload a cover image");
        setLoading(false);
        return;
      }

      const finalData = {
        ...formData,
        coverImage: coverImageURL,
      };

      await onSubmit(finalData);
      onClose();
    } catch (error) {
      console.error("Form Submission Error:", error);
      toast.error("Failed to save book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top-center"
      className="bg-paper"
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-bookNavy font-fraunses text-2xl">
              {initialData ? "Edit Book Details" : "Add New Book"}
            </ModalHeader>
            <ModalBody>
              <form
                id="book-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Image Upload Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer w-32 h-44 bg-bookNavy/5 rounded-lg border-2 border-dashed border-bookNavy/20 flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <Image
                        src={preview}
                        width={128}
                        height={128}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-bookNavy/40">
                        <ImageIcon size={32} />
                        <span className="text-xs mt-2 font-medium">
                          No Cover
                        </span>
                      </div>
                    )}

                    <label
                      htmlFor="cover-upload"
                      className="absolute inset-0 bg-bookNavy/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Upload className="text-white" size={24} />
                    </label>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <span className="text-xs text-bookNavy font-medium tracking-wide uppercase">
                    {initialData ? "Change Cover" : "Upload Cover"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Book Title"
                    placeholder="Enter book title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    startContent={
                      <Book className="text-bookNavy/50" size={18} />
                    }
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-white border-bookNavy/20",
                      label: "text-bookNavy/80",
                    }}
                    isRequired
                  />
                  <Input
                    label="Author"
                    placeholder="Enter author name"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    startContent={
                      <User className="text-bookNavy/50" size={18} />
                    }
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-white border-bookNavy/20",
                      label: "text-bookNavy/80",
                    }}
                    isRequired
                  />
                </div>

                <Select
                  label="Genre"
                  placeholder="Select a genre"
                  selectedKeys={formData.genre ? [formData.genre] : []}
                  onChange={handleSelectionChange}
                  variant="bordered"
                  classNames={{
                    trigger: "bg-white border-bookNavy/20",
                    label: "text-bookNavy/80",
                  }}
                  isRequired
                >
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </Select>

                <Textarea
                  label="Description"
                  placeholder="Enter book synopsis or description..."
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  startContent={
                    <FileText className="text-bookNavy/50 mt-1" size={18} />
                  }
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-white border-bookNavy/20",
                    label: "text-bookNavy/80",
                  }}
                  minRows={4}
                  isRequired
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                form="book-form"
                isLoading={loading}
                className="bg-bookNavy text-paper font-bold"
              >
                {initialData ? "Update Book" : "Add Book"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookForm;
