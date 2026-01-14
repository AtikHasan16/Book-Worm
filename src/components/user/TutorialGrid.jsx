"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

const TutorialGrid = ({ tutorials = [] }) => {
  const getEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-fraunses text-bookNavy mb-3">
          Learning Center
        </h1>
        <p className="text-lg text-bookNavy/60 font-dm-sans max-w-2xl mx-auto">
          Deepen your understanding of literature with our curated collection of
          video tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial, index) => {
          const embedUrl = getEmbedUrl(tutorial.videoUrl);

          return (
            <motion.div
              key={tutorial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white border border-bookNavy/10 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-video w-full bg-black relative">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={tutorial.title}
                      className="w-full h-full absolute inset-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/50 bg-neutral-900">
                      <Youtube size={48} className="mb-2" />
                      <span className="text-sm">Video unavailable</span>
                    </div>
                  )}
                </div>
                <CardBody className="p-5 flex flex-col justify-between h-auto">
                  <div>
                    <h3 className="text-lg font-bold text-bookNavy line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </h3>
                  </div>
                  {/* Add more metadata here later if needed (e.g. added date) */}
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {tutorials.length === 0 && (
        <div className="text-center py-20 bg-white/50 rounded-3xl border border-bookNavy/5">
          <Youtube size={64} className="mx-auto text-bookNavy/20 mb-4" />
          <h3 className="text-xl font-bold text-bookNavy">
            No tutorials available yet
          </h3>
          <p className="text-bookNavy/60 mt-2">
            Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorialGrid;
