"use client";
import React from "react";
import { useSession } from "next-auth/react";

const ProfileCard = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <div>profile card</div>
    </div>
  );
};

export default ProfileCard;
