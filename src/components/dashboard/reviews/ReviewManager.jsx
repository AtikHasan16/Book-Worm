"use client";
import React, { useState } from "react";
import { Card, CardBody, Avatar, Button, Chip, User } from "@heroui/react";
import { Check, X, MessageSquare, Star, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";

const ReviewManager = ({ initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const axiosInstance = useAxios();

  const handleApprove = async (id) => {
    try {
      await axiosInstance.patch(`/reviews/${id}/approve`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review approved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve review");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await axiosInstance.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.error("Review rejected and deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-bookNavy/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold font-fraunses text-bookNavy">
            Review Moderation
          </h1>
          <p className="text-bookNavy/60 font-dm-sans mt-2">
            Review, approve, or reject pending community submissions.
          </p>
        </div>
        <Chip variant="flat" color="warning" className="font-bold">
          {reviews.length} Pending
        </Chip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="bg-white border-l-4 border-l-warning h-full shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-5 flex flex-col gap-4">
                  {/* Book Info */}
                  <div className="flex items-center gap-3 pb-4 border-b border-bookNavy/5">
                    <Image
                      src={review.bookInfo?.coverImage}
                      alt="book"
                      width={40}
                      height={60}
                      className="object-cover rounded shadow-sm"
                    />
                    <div>
                      <p className="text-xs font-bold text-bookNavy/40 uppercase tracking-wider">
                        Review for
                      </p>
                      <h4 className="font-bold text-bookNavy line-clamp-1">
                        {review.bookInfo?.title || "Unknown Book"}
                      </h4>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200 fill-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-bookNavy/80 italic text-lg">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>

                  {/* User & Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <User
                      name={review.userInfo?.userName || "Anonymous"}
                      description="Verified User"
                      avatarProps={{
                        src: review.userInfo?.userImage,
                      }}
                      classNames={{
                        name: "font-bold text-bookNavy",
                        description: "text-bookNavy/40 text-xs",
                      }}
                    />

                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        color="danger"
                        variant="flat"
                        onPress={() => handleReject(review._id)}
                        className="font-bold shadow-sm"
                        title="Reject"
                      >
                        <X size={20} />
                      </Button>
                      <Button
                        isIconOnly
                        color="success"
                        className="text-white font-bold shadow-lg shadow-success/20"
                        onPress={() => handleApprove(review._id)}
                        title="Approve"
                      >
                        <Check size={20} />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {reviews.length === 0 && (
          <div className="col-span-full py-24 text-center text-bookNavy/40 bg-bookNavy/5 rounded-3xl border-2 border-dashed border-bookNavy/10">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Check size={40} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-bookNavy">All Caught Up!</h3>
            <p className="text-bookNavy/60 mt-2">
              No pending reviews requiring moderation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManager;
