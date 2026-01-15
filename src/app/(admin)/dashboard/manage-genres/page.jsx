import React from "react";
import GenreManager from "@/components/dashboard/genres/GenreManager";

const getGenres = async () => {
  try {
    const res = await fetch("https://bw-server-seven.vercel.app/api/genres", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch genres");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading genres:", error);
    return [];
  }
};

const ManageGenrePage = async () => {
  const genres = await getGenres();

  return (
    <div className="p-6">
      <GenreManager initialGenres={genres} />
    </div>
  );
};

export default ManageGenrePage;
