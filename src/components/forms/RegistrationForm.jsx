"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
} from "@heroui/react";
import { Upload, User, Mail, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegistrationForm = () => {
  const axiosInstance = useAxios();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Your ImgBB API Key
  const image_hosting_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload Image to ImgBB
      const imageFile = { image: formData.photo };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      const photoURL = res.data.data.display_url; // Get the URL
      // 2. Send User Data + Photo URL to Backend
      const userPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photo: photoURL, // Send the String URL, not the File
        role: "user", // Default role
      };

      await axiosInstance.post("/users", userPayload);

      toast.success("Registration Successful! Please Login.");
      router.push("/login");
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || "Registration Failed");
      if (error?.response?.data?.message === "User already exists") {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-none bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-col gap-1 pb-0 pt-8 px-8 items-center text-center">
        <h2 className="text-2xl font-fraunses font-bold text-bookNavy">
          Create Account
        </h2>
        <p className="text-sm text-bookNavy/60 font-dm-sans">
          Sign up to unlock your personal library
        </p>
      </CardHeader>
      <CardBody className="p-8 overflow-visible">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group cursor-pointer">
              <Avatar
                src={preview}
                showFallback={!preview}
                className="w-24 h-24 text-large ring-4 ring-white shadow-lg transition-transform group-hover:scale-105"
                fallback={<User size={40} className="text-bookNavy/40" />}
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-shelfWood text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-shelfWood/90 transition-colors"
              >
                <Upload size={16} />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <span className="text-xs text-bookNavy font-medium tracking-wide uppercase">
              Upload Photo
            </span>
          </div>

          {/* Input Fields */}
          <div className="space-y-10">
            <Input
              type="text"
              name="name"
              label="Full Name"
              placeholder="Enter your name"
              labelPlacement="outside"
              startContent={<User className="text-bookNavy" size={20} />}
              value={formData.name}
              onChange={handleInputChange}
              classNames={{
                label: "text-bookNavy/80 font-medium",
                input: "text-bookNavy placeholder:text-bookNavy/30",
                inputWrapper:
                  "bg-white hover:bg-white  border-1 border-bookNavy/10 shadow-sm",
              }}
              isRequired
            />
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="name@example.com"
              labelPlacement="outside"
              startContent={<Mail className="text-bookNavy" size={20} />}
              value={formData.email}
              onChange={handleInputChange}
              classNames={{
                label: "text-bookNavy/80 font-medium",
                input: "text-bookNavy placeholder:text-bookNavy/30",
                inputWrapper:
                  "bg-white hover:bg-white  border-1 border-bookNavy/10 shadow-sm",
              }}
              isRequired
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Create a password"
              labelPlacement="outside"
              startContent={<Lock className="text-bookNavy" size={20} />}
              value={formData.password}
              onChange={handleInputChange}
              classNames={{
                label: "text-bookNavy/80 font-medium",
                input: "text-bookNavy placeholder:text-bookNavy/30",
                inputWrapper:
                  "bg-white hover:bg-white  border-1 border-bookNavy/10 shadow-sm",
              }}
              isRequired
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-bookNavy text-paper font-bold shadow-lg hover:shadow-xl hover:bg-bookNavy/90 transition-all transform active:scale-95 mt-2 py-6 text-lg"
            radius="full"
          >
            Sign Up
          </Button>

          <div className="text-center mt-2">
            <p className="text-sm text-bookNavy/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-shelfWood font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default RegistrationForm;
