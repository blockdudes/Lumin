"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Chapter } from "@/types/types";
import toast from "react-hot-toast";

export function Chapterbar({
  toggleDialog,
  selectedChapterIndex,
  chapters,
  setSelectedChapterIndex,
  setChapters,
}: {
  toggleDialog: () => void;
  selectedChapterIndex: number;
  chapters: Chapter[];
  setSelectedChapterIndex: Dispatch<SetStateAction<number>>;
  setChapters: (chapters: Chapter[]) => void;
}) {
  const addChapter = () => {
    const newChapter: Chapter = {
      title: `Chapter: ${chapters.length + 1}`,
      description: "",
      content: "",
      file: null, 
    };
    setChapters([...chapters, newChapter]);
    setSelectedChapterIndex(chapters.length);
  };

  const deleteChapter = (index: number) => {
    if (chapters.length === 1) {
      toast.error("You cannot delete the last chapter");
      return;
    }
    setChapters(chapters.filter((_, i) => i !== index));
    if (selectedChapterIndex === index) {
      setSelectedChapterIndex(index - 1);
    }
  };

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
            {chapters.map((chapter: Chapter, index: number) => (
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
                    color={selectedChapterIndex === index ? "blue" : "black"}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Chapter {index + 1}
                  </Typography>
                  {index === chapters.length - 1 && (
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteChapter(index);
                      }}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </IconButton>
                  )}
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center flex-grow justify-center gap-4">
            <Button
              variant="outlined"
              size="lg"
              color="blue"
              className="w-full"
              onClick={addChapter}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add chapter
            </Button>
            <IconButton
              onClick={toggleDialog}
              variant="gradient"
              size="lg"
              color="blue"
              className="w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
