"use client";
import FileUpload from "@/components/createComponents/FileUpload";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  headingsPlugin,
  InsertCodeBlock,
  linkDialogPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  Separator,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

interface Data {
  chapterTitle: string;
  chapterDescription: string;
  files: File | null;
  content: string;
}

interface ChapterData {
  chapterTitle: string;
  chapterDescription: string;
  content: string;
}

interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
}

const CreateCourse = () => {
  const ref = React.useRef<MDXEditorMethods>(null);
  const [isClient, setIsClient] = React.useState(false);

  const [fetchedChapters, setFetchedChapters] = useState<{ [key: string]: ChapterData | FileData }>({});

  const [data, setData] = useState<Data>({
    chapterTitle: "",
    chapterDescription: "",
    files: null,
    content: "",
  })

  const [chapters, setChapters] = useState<Data[]>([]);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState<string>("");


  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (
    field: string,
    value: string | File
  ) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSend = async () => {
    // const formData = new FormData();
    // formData.append("hash", "hash2");
    // formData.append("title", "title");
    // formData.append("description", "description");
    // formData.append("thumbnail", "thumbnail");

    // chapters.forEach((chapter, index) => {
    //   const { files, ...chapterData } = chapter;
    //   console.log("chapterData", files);

    //   formData.append(`chapter-${index}`, JSON.stringify(chapterData));
    //   if (files) {
    //     formData.append(`files-${index}`, files);
    //   }
    // });
    // console.log(Array.from(formData.entries()));

    // const response = await axios.post('/api/resource/create', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    // console.log(response);


    const response = await axios.get('/api/resource/fetch/hash2');
    console.log("response", response?.data?.data);
    // setFetchedChapters(response?.data?.data);
  }
  // console.log(chapters);

  // const renderFetchedChapters = () => {
  //   if (Object.keys(fetchedChapters).length === 0) return null;

  //   return Object.entries(fetchedChapters).map(([key, value]) => {
  //     if (key.startsWith('chapter-')) {
  //       const chapterData = value as ChapterData;
  //       return (
  //         <div key={key} className="mb-4 p-4">
  //           <h3 className="text-lg font-bold">{chapterData.chapterTitle}</h3>
  //           <p>{chapterData.chapterDescription}</p>
  //           <p className="mt-2">Content: {chapterData.content}</p>
  //         </div>
  //       );
  //     } else if (key.startsWith('files-')) {
  // const fileData = value as FileData;
  // const byteCharacters = atob(fileData.content.split(',')[1]);
  // const byteNumbers = new Array(byteCharacters.length);

  // console.log("byteCharacters", byteCharacters);
  // console.log("byteNumbers", byteNumbers);

  // for (let i = 0; i < byteCharacters.length; i++) {
  //   byteNumbers[i] = byteCharacters.charCodeAt(i);
  // }
  // const byteArray = new Uint8Array(byteNumbers);
  // const blob = new Blob([byteArray], { type: fileData.type });
  // const url = URL.createObjectURL(blob);


  //       return (
  //         <div key={key} className="mb-4 p-4">
  //           <h4 className="text-md font-semibold">Video File</h4>
  //           <p>Name: {fileData.name}</p>
  //           <p>Size: {fileData.size} bytes</p>
  //           {fileData.content && (
  //             <video controls className="mt-2 w-full">
  //               <source src={url} type={fileData.type} />
  //               Your browser does not support the video tag.
  //             </video>
  //           )}
  //         </div>
  //       );
  //     }
  //     return null;
  //   });
  // };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <button onClick={() => setChapters([...chapters, data])}>set chapter</button>
      <button onClick={handleSend}>send chapters</button>

      {/* {renderFetchedChapters()} */}

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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            value={data.chapterTitle}
            onChange={(e) => handleInputChange("chapterTitle", e.target.value)}
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            value={data.chapterDescription}
            onChange={(e) => handleInputChange("chapterDescription", e.target.value)}
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
        <FileUpload handleInputChange={handleInputChange} />
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
            <MDEditor height={400} value={data.content} onChange={(e) => handleInputChange("content", "this is content")} />
          </Card>
        </Card>
      )}
    </div>
  );
};

export default CreateCourse;
