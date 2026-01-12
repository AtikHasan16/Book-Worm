import { Search } from "lucide-react";
import React from "react";

const DashNav = () => {
  return (
    <header className="flex h-20 items-center justify-between bg-bookNavy border-l border-paper px-8">
      <div className="flex w-full max-w-md items-center rounded-xl bg-paper px-4 py-2.5">
        <span className="text-gray-400">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search your favorite books"
          className="ml-2 w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
        />
      </div>
    </header>
  );
};

export default DashNav;
