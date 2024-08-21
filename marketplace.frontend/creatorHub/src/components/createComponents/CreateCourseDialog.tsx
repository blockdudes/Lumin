import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch,
  Input,
} from "@material-tailwind/react";

interface CreateCourseDialogProps {
  open: boolean;
  onClose: () => void;
  data: {
    title: string;
    description: string;
  };
}

export function CreateCourseDialog({
  open,
  onClose,
  data,
}: CreateCourseDialogProps) {
  return (
    <>
      <Dialog
        open={open}
        handler={onClose}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create Course
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-4 items-center justify-end">
            <span>Public</span>
            <Switch
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              color="blue"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="border border-gray-400 p-4 text-sm rounded-md px-4 py-2 flex items-center justify-start">
              <span>Course Name : </span>
              <span>{data.title}</span>
            </div>
            <div className="border border-gray-400 p-4 text-sm rounded-md px-4 py-2 flex items-center justify-start">
              <span>Course Description : </span>
              <span>{data.description}</span>
            </div>
            <Input
              label="Price"
              placeholder="Enter Price"
              type="number"
              color="blue"
              variant="outlined"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
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
            color="gray"
            onClick={onClose} // Use onClose for button click
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={onClose} // Use onClose for button click
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
