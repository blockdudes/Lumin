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
import React from "react";

const CreateCourse = () => {
  const ref = React.useRef<MDXEditorMethods>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
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
        <FileUpload />
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
            <MDXEditor
              markdown="Hello world"
              className="rounded-lg max-h-[400px] overflow-y-auto "
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                linkDialogPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                      <CreateLink />
                      <Separator />
                      <InsertCodeBlock />
                      <Separator />
                      <CodeToggle />
                    </>
                  ),
                }),
              ]}
              ref={ref}
            />
          </Card>
        </Card>
      )}
    </div>
  );
};

export default CreateCourse;
