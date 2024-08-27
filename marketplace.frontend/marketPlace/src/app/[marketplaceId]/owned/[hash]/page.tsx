"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Course } from "@/types/types";
import { Chapter } from "@/types/types";
import { ChapterBar } from "@/components/courseComponents/chapterBar";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { primary } from "@/constants/colors";

const CourseDetails = () => {
  const { hash } = useParams<{ hash: string }>();
  const dispatch = useAppDispatch();
  const resource = useAppSelector(
    (state) => state.ownedResources.ownedResources
  ).find((resource) => resource.resourceHash === hash);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [courseDetails, setCourseDetails] = useState<
    (Course & { chapters: Chapter[] }) | null
  >(null);

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    fetch(`/api/resources/fetch/${hash}`)
      .then((res) => res.json())
      .then((data) => {
        const courseDetails = {
          ...data.data,
          ...resource,
        };
        setCourseDetails(courseDetails);
      })
      .finally(() => {
        dispatch(setIsAppLoading(false));
      });
  }, [hash]);

  if (courseDetails === null) {
    return null;
  }

  return (
    <div className="pr-[350px]">
      <div className="fixed top-0 right-0">
        <ChapterBar
          chapters={courseDetails.chapters}
          selectedChapterIndex={selectedChapterIndex}
          setSelectedChapterIndex={setSelectedChapterIndex}
          hasStarted={hasStarted}
        />
      </div>
      {!hasStarted ? (
        <div className="w-full flex flex-col items-center gap-4 p-4">
          <h1 className="text-3xl font-bold text-center">{courseDetails.title}</h1>
          <div className="w-full h-72 flex justify-center items-center">
            <img
              src={courseDetails.image_url}
              alt={courseDetails.title}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <p className="text-lg ">{courseDetails.description}</p>
          <button
            className={`bg-${primary}-500 hover:bg-${primary}-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1`}
            onClick={() => setHasStarted(true)}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-5 p-4">
          {courseDetails.chapters.map((chapter, index) => (
            <div
              key={chapter.title}
              className={`transition-opacity duration-500 ${
                index === selectedChapterIndex
                  ? "opacity-100"
                  : "opacity-0 hidden"
              }`}
            >
              <h2 className="text-2xl font-bold">{chapter.title}</h2>
              <p className="text-lg text-gray-800 font-medium">
                {chapter.description}
              </p>
              <div className="text-base whitespace-pre-line text-gray-600">
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
