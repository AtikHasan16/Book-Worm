"use client";
import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Mail, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";

const LoginPage = () => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login Data:", formData);
    // Here you would typically send the data to your backend
    //  User login system
    axiosInstance
      .post("/users/login", formData)
      .then((response) => {
        toast.success(`${response.data.message}`);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcoming Text/Illustration */}
        <div className="hidden md:block space-y-6 p-8">
          <div className="inline-block p-3 bg-shelfWood/10 rounded-2xl mb-4">
            <BookOpen size={48} className="text-shelfWood" />
          </div>
          <h1 className="text-5xl font-fraunses font-bold text-bookNavy leading-tight">
            Welcome <br />
            <span className="text-shelfWood">Back, Reader</span>
          </h1>
          <p className="text-lg text-bookNavy/70 font-dm-sans leading-relaxed max-w-md">
            Your library is waiting for you. Continue where you left off and
            explore new worlds through the pages of your favorite books.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-none bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-col gap-1 pb-0 pt-8 px-8 items-center text-center">
            <h2 className="text-2xl font-fraunses font-bold text-bookNavy">
              Welcome Back
            </h2>
            <p className="text-sm text-bookNavy/60 font-dm-sans">
              Login to access your personal library
            </p>
          </CardHeader>
          <CardBody className="p-8 overflow-visible">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Input Fields */}
              <div className="space-y-10">
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
                      "bg-white hover:bg-white focus-within:bg-white border-1 border-bookNavy/10 shadow-sm",
                  }}
                  isRequired
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  labelPlacement="outside"
                  startContent={<Lock className="text-bookNavy" size={20} />}
                  value={formData.password}
                  onChange={handleInputChange}
                  classNames={{
                    label: "text-bookNavy/80 font-medium",
                    input: "text-bookNavy placeholder:text-bookNavy/30",
                    inputWrapper:
                      "bg-white hover:bg-white focus-within:bg-white border-1 border-bookNavy/10 shadow-sm",
                  }}
                  isRequired
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-bookNavy text-paper font-bold shadow-lg hover:shadow-xl hover:bg-bookNavy/90 transition-all transform active:scale-95 py-6 text-lg"
                radius="full"
              >
                Log In
              </Button>

              <div className="text-center mt-2">
                <p className="text-sm text-bookNavy/60">
                  Do not have an account?{" "}
                  <Link
                    href="/register"
                    className="text-shelfWood font-bold hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
