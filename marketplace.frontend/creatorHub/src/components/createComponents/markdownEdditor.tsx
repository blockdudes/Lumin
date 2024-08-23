import MDEditor from "@uiw/react-md-editor";
import React from "react";

export const MarkdownEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleEditorChange = (val?: string) => {
    if (val !== undefined) {
      onChange(val);
    }
  };

  return (
    <div className="container">
      <div data-color-mode="light">
        <MDEditor height={400} value={value} onChange={handleEditorChange} />
      </div>
    </div>
  );
};
