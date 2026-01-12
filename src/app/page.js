import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-paper">
      <div className="text-center">
        <h1 className="text-4xl font-fraunses font-bold text-bookNavy mb-4">
          Welcome to BookWorm
        </h1>
        <p className="text-stone-500 font-dm-sans text-lg">
          Your personal reading companion.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
