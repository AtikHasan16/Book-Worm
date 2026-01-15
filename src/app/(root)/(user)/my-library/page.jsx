"use client";
import React, { useEffect, useState } from "react";
import LibraryManager from "@/components/user/library/LibraryManager";
import { useSession } from "next-auth/react";
import useAxios from "@/hooks/useAxios";
import { Spinner } from "@heroui/react";

const MyLibraryPage = () => {
  const { data: session, status } = useSession();
  const [shelfItems, setShelfItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchShelves = async () => {
      if (session?.user?.email) {
        try {
          const res = await axiosInstance.get(`/shelves/${session.user.email}`);
          setShelfItems(res.data);
        } catch (error) {
          console.error("Failed to fetch library", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchShelves();
  }, [session, status, axiosInstance]);

  if (loading || status === "loading") {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pb-20 pt-4">
      <LibraryManager initialShelfItems={shelfItems} />
    </div>
  );
};

export default MyLibraryPage;
