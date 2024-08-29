"use client";
import { Card, Typography } from "@material-tailwind/react";
import { FetchedResource } from "@/types/types";

export function ChapterBar({
  selectedChapterIndex,
  chapters,
  setSelectedChapterIndex,
  hasStarted, // Add this prop to receive the hasStarted state
}: {
  selectedChapterIndex: number;
  chapters: FetchedResource[];
  setSelectedChapterIndex: (index: number) => void;
  hasStarted: boolean; // Declare the new prop type
}) {
  return (
    <div className="w-[350px] h-screen">
      <Card
        className="px-4 shadow-lg rounded-none h-full w-full py-8"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col h-screen justify-between">
          <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto">
            <Typography
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Chapters
            </Typography>
            {chapters.map((chapter, index) => (
              <Card
                className="p-4 m-2"
                key={index}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => setSelectedChapterIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <Typography
                    variant="lead"
                    className="!font-bold"
                    color={
                      hasStarted && selectedChapterIndex === index
                        ? "green"
                        : "black"
                    }
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Chapter {index + 1}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
