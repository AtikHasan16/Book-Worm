import React from "react";
import LoginForm from "@/components/forms/LoginForm";
import { BookOpen } from "lucide-react";

const LoginPage = () => {
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
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
