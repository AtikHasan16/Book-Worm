import React from "react";

import { BookOpen } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcoming Text/Illustration placeholder */}
        <div className="hidden md:block space-y-6 p-8">
          <div className="inline-block p-3 bg-shelfWood/10 rounded-2xl mb-4">
            <BookOpen size={48} className="text-shelfWood" />
          </div>
          <h1 className="text-5xl font-fraunses font-bold text-bookNavy leading-tight">
            Begin Your <br />
            <span className="text-shelfWood">Reading Journey</span>
          </h1>
          <p className="text-lg text-bookNavy/70 font-dm-sans leading-relaxed max-w-md">
            Join our community of book lovers. Track your reading, discover new
            favorites, and share your thoughts with fellow bibliophiles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
