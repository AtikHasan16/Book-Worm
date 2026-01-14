"use client";
import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  Select,
  SelectItem,
  Textarea,
  Card,
  CardBody,
  Avatar,
  Chip,
} from "@heroui/react";
import { Star, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";

const SHELF_OPTIONS = [
  { key: "Want to Read", label: "Want to Read", icon: BookOpen },
  { key: "Currently Reading", label: "Currently Reading", icon: Clock },
  { key: "Read", label: "Read", icon: CheckCircle2 },
];

const BookDetailsClient = ({ book, initialReviews = [] }) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(initialReviews);
  const [currentShelf, setCurrentShelf] = useState(new Set([]));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const axiosInstance = useAxios();
  const router = useRouter();

  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + parseInt(curr.rating), 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";

  // Handle Shelf Change
  const handleShelfChange = async (e) => {
    if (!session) {
      toast.error("Please login to manage your shelf");
      router.push("/login");
      return;
    }

    const newShelf = e.target.value;
    setCurrentShelf(new Set([newShelf]));
    // console.log(session.user);

    try {
      await axiosInstance.post("/shelves", {
        userId: session.user.email,
        bookInfo: book,
        shelf: newShelf,
      });
      toast.success(`Added to ${newShelf}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update shelf");
    }
  };

  // Submit Review
  const handleSubmitReview = async () => {
    if (!session) {
      toast.error("Please login to write a review");
      router.push("/login"); // Fixed: router.push instead of return redirection
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setSubmittingReview(true);
    try {
      await axiosInstance.post("/reviews", {
        bookInfo: book,
        userInfo: {
          userId: session.user.email,
          userName: session.user.name,
          userImage: session.user.image,
        },
        rating,
        comment,
      });

      toast.success("Review submitted for approval!");
      setComment("");
      setRating(0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-16">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="aspect-2/3 relative rounded-lg shadow-2xl overflow-hidden">
            <Image
              src={book.coverImage}
              alt={book.title}
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover",
              }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-6">
          <div>
            <Chip
              color="primary"
              variant="flat"
              className="mb-2 font-bold uppercase tracking-wider"
            >
              {book.genre}
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold font-fraunses text-bookNavy leading-tight mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-bookNavy/70 font-medium">
              by {book.author}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 font-bold border border-yellow-200">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
              <span>{averageRating}</span>
            </div>
            <span className="text-bookNavy/50 text-sm">
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-bookNavy/80 font-dm-sans">
              {book.description || "No description available."}
            </p>
          </div>

          <div className="pt-4 w-full md:w-64">
            <Select
              label="Add to Shelf"
              placeholder="Select Status"
              selectedKeys={currentShelf}
              onChange={handleShelfChange}
              variant="bordered"
              classNames={{
                trigger: "bg-white border-bookNavy/10 h-14",
                label: "font-bold text-bookNavy/60",
              }}
            >
              {SHELF_OPTIONS.map((option) => (
                <SelectItem
                  key={option.key}
                  startContent={<option.icon size={18} />}
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-bookNavy/10 pt-12">
        {/* Review List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-fraunses text-bookNavy">
            Community Reviews
          </h2>
          {reviews.length === 0 ? (
            <p className="text-bookNavy/50 italic">
              No approved reviews yet. Be the first!
            </p>
          ) : (
            reviews.map((review, idx) => (
              <Card key={idx} className="bg-white border-none shadow-sm">
                <CardBody className="flex flex-row gap-4">
                  <Avatar src={review.userImage || ""} name={review.userName} />
                  <div>
                    <p className="font-bold text-bookNavy">{review.userName}</p>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200 fill-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-bookNavy/70 text-sm mt-2">
                      {review.comment}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>

        {/* Write Review */}
        <div>
          <Card className="bg-paper border border-bookNavy/10 shadow-none">
            <CardBody className="p-6 space-y-4">
              <h3 className="text-xl font-bold font-fraunses text-bookNavy">
                Write a Review
              </h3>

              {/* Rating Input */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="Share your thoughts about this book..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                minRows={4}
                variant="flat"
                classNames={{ inputWrapper: "bg-white" }}
              />

              <Button
                color="primary"
                className="w-full font-bold shadow-lg shadow-primary/20"
                onPress={handleSubmitReview}
                isLoading={submittingReview}
              >
                Submit Review
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsClient;
