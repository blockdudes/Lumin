import { Chapterbar } from "@/components/createComponents/chapterbar";
import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="mr-[350px] pr-4">{children}</div>
      <div className="fixed h-full w-[350px] top-0 right-0">
        <Chapterbar />
      </div>
    </div>
  );
};

export default CreateLayout;
