import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Switch,
} from "@material-tailwind/react";

export function PublicDialog({
  isPublic,
  open,
  handleOpen,
}: {
  isPublic: boolean;
  open: boolean;
  handleOpen: () => void;
}) {
  const [updatedIsPublic, setUpdatedIsPublic] = React.useState(isPublic);

  const handleUpdatePublic = () => {
    console.log("updatedIsPublic", updatedIsPublic);
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
          Edit Description
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex gap-4 items-center justify-center">
            <span>Not Listed</span>
            <Switch
              checked={isPublic}
              onChange={(e) => setUpdatedIsPublic(e.target.checked)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              color="blue"
            />
            <span>Listed</span>
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
            onClick={handleUpdatePublic}
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
