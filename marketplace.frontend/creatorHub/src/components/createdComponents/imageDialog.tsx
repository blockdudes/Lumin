import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

export function ImageDialog({
  image,
  open,
  handleOpen,
}: {
  image: string;
  open: boolean;
  handleOpen: () => void;
}) {
  const [updatedImage, setUpdatedImage] = useState(image);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleUpdateImage = () => {
    console.log("updatedImage", updatedImage);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Edit Image
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="border-1 border-blue-gray-300 border w-full h-full px-2 py-1 justify-start items-center rounded-lg flex gap-4">
            <span>Thumbnail: </span>
            <input
              id="thumbnail-input"
              type="file"
              color="blue"
              onChange={(e) => {
                if (e.target.files) {
                  setThumbnail(e.target.files[0]);
                }
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleUpdateImage}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
