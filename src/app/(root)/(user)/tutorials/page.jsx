import React from "react";
import TutorialGrid from "@/components/user/TutorialGrid";

const getTutorials = async () => {
  try {
    const res = await fetch("http://localhost:2000/api/tutorials", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tutorials");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading tutorials:", error);
    return [];
  }
};

const TutorialsPage = async () => {
  const tutorials = await getTutorials();

  return (
    <div className="min-h-screen bg-paper pb-20">
      <TutorialGrid tutorials={tutorials} />
    </div>
  );
};

export default TutorialsPage;
