"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export function CoursePurchaseDialog({
  open,
  handleOpen,
  id,
  img,
  title,
  description,
}: {
  open: boolean;
  handleOpen: () => void;
  id: string;
  img: string;
  title: string;
  description: string;
}) {

  console.log({
    "id": id,
    "img": img,
    "title": title,
    "description": description,
  })

    const router = useRouter();

    const handleConfirm = () => {
        router.push(`/owned/${id}`);
        handleOpen();
    }
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
          {title}
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {description}
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
            onClick={handleConfirm}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Purchase</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
