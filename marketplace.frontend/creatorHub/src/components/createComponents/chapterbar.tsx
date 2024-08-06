"use client";

import { useState } from "react";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/solid";

interface Chapter {
  id: number;
  name: string;
}

export function Chapterbar() {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, name: "Chapter: 1" }
  ]);

  const addChapter = () => {
    const newChapter: Chapter = {
      id: chapters.length + 1,
      name: `Chapter: ${chapters.length + 1}`,
    };
    setChapters([...chapters, newChapter]);
  };

  const deleteChapter = (id: number) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
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
                key={chapter.id}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="flex items-center justify-between">
                  <Typography
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {chapter.name}
                  </Typography>
                  {index === chapters.length - 1 && (
                    <IconButton
                      onClick={() => deleteChapter(chapter.id)}
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