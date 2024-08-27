"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Course } from "@/types/types";
import { Chapter } from "@/types/types";
import { ChapterBar } from "@/components/courseComponents/chapterBar";

const chapter: Chapter[] = [
  {
    title: "Introduction to React 1",
    description: "This is the introduction to React",
    files: [],
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat eius error animi nemo minus, enim harum in corrupti nobis itaque ratione blanditiis a rerum architecto necessitatibus, consectetur rem earum molestiae facere vel maiores consequatur suscipit? Alias optio iste iure saepe adipisci tenetur, dignissimos doloribus architecto. Tenetur at iste sint corporis!",
  },
  {
    title: "Introduction to React 2",
    description: "This is the introduction to React",
    files: [],
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut iure possimus quasi in numquam, tenetur nihil. Accusantium fugiat mollitia dolore ab veritatis totam, vel nostrum quasi, hic est, minus sapiente repudiandae at magni quae expedita reiciendis pariatur animi voluptatibus eaque voluptates cum! Iusto, dignissimos quam. Culpa commodi tenetur facere quas.",
  },
];

const course: Course = {
  id: "dsadas",
  image_url: "https://via.placeholder.com/700x250",
  title: "Introduction to React",
  description:
    "This is the introduction to React " +
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi in similique numquam cum, deserunt nulla quo odio dolorem ea, ipsa temporibus saepe omnis tempore deleniti earum voluptatem eum libero eos.",
  chapters: chapter,
};

const CourseDetails = () => {
  const pathname = usePathname();
  const courseId = pathname.split("/")[2];
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="pr-[350px]">
      <div className="fixed top-0 right-0">
        <ChapterBar
          chapters={course.chapters}
          selectedChapterIndex={selectedChapterIndex}
          setSelectedChapterIndex={setSelectedChapterIndex}
          hasStarted={hasStarted}
        />
      </div>
      {!hasStarted ? (
        <div className="w-full flex flex-col items-center gap-4 p-4">
          <h1 className="text-3xl font-bold text-center">{course.title}</h1>
          <div className="w-full h-72 flex justify-center items-center">
            <img
              src={course.image_url}
              alt={course.title}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <p className="text-lg ">{course.description}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => setHasStarted(true)}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4 p-4">
          {course.chapters.map((chapter, index) => (
            <div
              key={chapter.title}
              className={`transition-opacity duration-500 ${
                index === selectedChapterIndex
                  ? "opacity-100"
                  : "opacity-0 hidden"
              }`}
            >
              <h2 className="text-2xl font-bold">{chapter.title}</h2>
              <p className="text-lg">{chapter.description}</p>
              <div className="text-base whitespace-pre-line">
                {chapter.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
