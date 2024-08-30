import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { eduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddCategoryDialog({ open, onClose }: AddCategoryDialogProps) {
  const account = useActiveAccount();

  const [categoryName, setCategoryName] = useState<string>("");

  const tx = prepareContractCall({
    contract: contract(eduChain),
    method: "function addCategory(string memory _category) public",
    params: [categoryName],
    gas: BigInt(10000000),
  });

  const addCategory = async () => {
    const loader = toast.loading("Adding Category...");
    try {
      const res = await sendAndConfirmTransaction({
        transaction: tx,
        account: account!,
      });
      console.log(res);
      if (res.status === "success") {

        toast.success("Category Added Successfully", { id: loader });
        onClose();
      } else {
        toast.error("Failed to Add Category", { id: loader });
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to Add Category", { id: loader });
    }
  };

  const handleAddCategory = async () => {
    await addCategory();
    onClose();
  };

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
          Add Category
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Input
            label="Category Name"
            type="text"
            color="blue"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
            color="gray"
            onClick={onClose}
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
            onClick={handleAddCategory}
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
