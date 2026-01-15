import React from "react";
import TutorialManager from "@/components/dashboard/tutorials/TutorialManager";

const getTutorials = async () => {
  try {
    const res = await fetch(
      "https://bw-server-seven.vercel.app/api/tutorials",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tutorials");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading tutorials:", error);
    return [];
  }
};

const ManageTutorialPage = async () => {
  const tutorials = await getTutorials();

  return (
    <div className="p-6">
      <TutorialManager initialTutorials={tutorials} />
    </div>
  );
};

export default ManageTutorialPage;
