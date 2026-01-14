"use client";
import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Mail, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
const LoginForm = () => {
  const axiosInstance = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Login Successful!");
      router.push("/");
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bookNavy"></div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default LoginForm;
