import Chapterbar from "@/components/createComponents/chapterbar";
import React from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1">{children}</div>
      <div className="w-[300px] h-full">
        <Chapterbar />
      </div>
    </div>
  );
};

export default CreateLayout;
