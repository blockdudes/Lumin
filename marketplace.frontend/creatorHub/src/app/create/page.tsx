"use client";
import { Chapterbar } from "@/components/createComponents/chapterbar";
import {CreateCourseDialog} from "@/components/createComponents/createCourseDialog";
import FileUpload from "@/components/createComponents/FileUpload";
import { Chapter, Course } from "@/types/types";
import { Card, CardBody, Input, Textarea } from "@material-tailwind/react";
import "@mdxeditor/editor/style.css";
import React, { useEffect, useState } from "react";
import { MarkdownEditor } from "@/components/createComponents/markdownEdditor";

const CreateCourse = () => {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const toggleDialog = () => {
    setOpen(!open);
  };
  const [data, setData] = useState<Course>({
    title: "",
    description: "",
    chapters: [
      {
        title: "Chapter: 1",
        description: "",
        files: [],
        content: "",
      },
    ],
  });

  const setChapters = (chapters: Chapter[]) => {
    setData((prev) => ({ ...prev, chapters }));
  };

  const editSelectedChapter = (index: number, chapter: Chapter) => {
    setData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((c, i) => (i === index ? chapter : c)),
    }));
  };

  const setSelectedChapterTitle = (title: string) => {
    const updatedChapter = data.chapters[selectedChapterIndex];
    updatedChapter.title = title;
    editSelectedChapter(selectedChapterIndex, updatedChapter);
  };

  const setSelectedChapterDescription = (description: string) => {
    const updatedChapter = data.chapters[selectedChapterIndex];
    updatedChapter.description = description;
    editSelectedChapter(selectedChapterIndex, updatedChapter);
  };

  const setSelectedChapterFiles = (files: File[]) => {
    const updatedChapter = data.chapters[selectedChapterIndex];
    updatedChapter.files = files;
    editSelectedChapter(selectedChapterIndex, updatedChapter);
  };

  const setSelectedChapterContent = (content: string) => {
    const updatedChapter = data.chapters[selectedChapterIndex];
    updatedChapter.content = content;
    editSelectedChapter(selectedChapterIndex, updatedChapter);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="mr-[350px] pr-4">
          <div className="w-full h-full flex flex-col gap-4">
            <Card
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="w-[770px]"
            >
              <CardBody
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="flex flex-col gap-4"
              >
                <div className="text-xl font-bold">Chapter Title</div>
                <Input
                  placeholder="Enter the title of the chapter"
                  className="w-full"
                  color="blue"
                  label="Title"
                  value={data.chapters[selectedChapterIndex].title}
                  onChange={(e) => setSelectedChapterTitle(e.target.value)}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </CardBody>
            </Card>
            <Card
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="w-[770px]"
            >
              <CardBody
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="flex flex-col gap-4"
              >
                <div className="text-xl font-bold">Chapter Description</div>
                <Textarea
                  className="w-full"
                  color="blue"
                  label="Description"
                  value={data.chapters[selectedChapterIndex].description}
                  onChange={(e) =>
                    setSelectedChapterDescription(e.target.value)
                  }
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </CardBody>
            </Card>
            <Card
              className="p-4 w-[770px] flex flex-col "
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="text-xl font-bold">Upload Files</div>
              <FileUpload
                files={data.chapters[selectedChapterIndex].files}
                setFiles={setSelectedChapterFiles}
              />
            </Card>
            {isClient && (
              <Card
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="p-4 w-[770px] flex flex-col gap-4"
              >
                <div className="text-xl font-bold">Chapter Content</div>
                <Card
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="shadow-none h-[400px]"
                >
                  <MarkdownEditor
                    value={data.chapters[selectedChapterIndex].content}
                    onChange={(val) => setSelectedChapterContent(val)}
                  />
                </Card>
              </Card>
            )}
          </div>
        </div>
        <div className="fixed h-full w-[350px] top-0 right-0">
          <Chapterbar
            chapters={data.chapters}
            setChapters={setChapters}
            selectedChapterIndex={selectedChapterIndex}
            setSelectedChapterIndex={setSelectedChapterIndex}
          />
        </div>
      </div>
      <CreateCourseDialog open={open} onClose={toggleDialog} data={data} />
    </>
  );
};

export default CreateCourse;
