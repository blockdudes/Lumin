import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { prepareContractCall } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

export function TitleDialog({
  title,
  open,
  handleOpen,
}: {
  title: string;
  open: boolean;
  handleOpen: () => void;
}) {
  const [updatedTitle, setUpdatedTitle] = React.useState(title);
  const account = useActiveAccount();

  const handleUpdateTitle = () => {
    try {
      if (!account) {
        toast.error("Please connect your wallet");
        return;
      }
      // const tx = prepareContractCall({
      //   contract: contract(account.address),
      //   method
      // })
    } catch (e) {
      console.log(e);
      toast.error("Failed to update title");
    }
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
          Edit Title
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Input
            variant="outlined"
            label="Title"
            placeholder={title}
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
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
            onClick={handleUpdateTitle}
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
