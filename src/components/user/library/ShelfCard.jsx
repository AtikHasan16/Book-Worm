"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Progress,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  MoreVertical,
  BookOpen,
  Trash2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const ShelfCard = ({ item, onUpdate, onDelete }) => {
  const { bookInfo, shelf } = item;
console.log(item);

  // // Calculate percentage if Currently Reading
  // const percentage =
  //   shelf === "Currently Reading" && bookInfo.totalPages
  //     ? Math.round((bookInfo.progress / bookInfo.totalPages) * 100)
  //     : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full border border-bookNavy/5 hover:shadow-md transition-shadow bg-white">
        <CardBody className="p-0 flex flex-row h-40">
          {/* Cover Image */}
          <div className="w-28 relative shrink-0">
            <Image
              src={bookInfo.coverImage}
              alt={bookInfo.title}
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover rounded-l-lg rounded-r-none",
              }}
              radius="none"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3
                  className="font-bold text-bookNavy line-clamp-1"
                  title={bookInfo.title}
                >
                  {bookInfo.title}
                </h3>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-bookNavy/50 -mr-2 -mt-2"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Shelf Actions">
                    <DropdownItem
                      key="move_want_to_read"
                      startContent={<BookOpen size={16} />}
                      onPress={() =>
                        onUpdate(item._id, { status: "Want to Read" })
                      }
                      className={status === "Want to Read" ? "hidden" : ""}
                    >
                      Move to Want to Read
                    </DropdownItem>
                    <DropdownItem
                      key="move_reading"
                      startContent={<Clock size={16} />}
                      onPress={() =>
                        onUpdate(item._id, {
                          status: "Currently Reading",
                          progress: 0,
                        })
                      }
                      className={status === "Currently Reading" ? "hidden" : ""}
                    >
                      Start Reading
                    </DropdownItem>
                    <DropdownItem
                      key="move_read"
                      startContent={<CheckCircle2 size={16} />}
                      onPress={() => onUpdate(item._id, { status: "Read" })}
                      className={status === "Read" ? "hidden" : ""}
                    >
                      Mark as Read
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<Trash2 size={16} />}
                      onPress={() => onDelete(item._id)}
                    >
                      Remove from Library
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <p className="text-xs text-bookNavy/60 font-medium">
                {bookInfo.author}
              </p>
            </div>

            {/* Progress Bar for Currently Reading */}
            {status === "Currently Reading" && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-bookNavy/60 mb-1">
                  <span>
                    {progress || 0} / {bookInfo.totalPages || "?"} pages
                  </span>
                  <span>{percentage}%</span>
                </div>
                <Progress
                  size="sm"
                  value={percentage}
                  color="primary"
                  classNames={{ track: "bg-bookNavy/5" }}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="flat"
                    className="h-6 text-xs"
                    onPress={() => {
                      const newPage = prompt(
                        "Enter new page number:",
                        progress || 0
                      );
                      if (newPage !== null && !isNaN(newPage)) {
                        onUpdate(item._id, { progress: parseInt(newPage) });
                      }
                    }}
                  >
                    Update Progress
                  </Button>
                </div>
              </div>
            )}

            {/* Other Status Indicators */}
            {status !== "Currently Reading" && (
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-bookNavy/40 flex items-center gap-1">
                {status === "Want to Read" && <BookOpen size={12} />}
                {status === "Read" && <CheckCircle2 size={12} />}
                {status}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ShelfCard;
