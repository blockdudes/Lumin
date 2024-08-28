"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRouter, useParams } from "next/navigation";
import { primary } from "@/constants/colors";
import toast from "react-hot-toast";
import {
  prepareContractCall,
  sendAndConfirmTransaction,
  toEther,
  toWei,
} from "thirdweb";
import { contract } from "@/constants/contracts";
import { tenderlyEduChain } from "@/constants/chains";
import { Course } from "@/types/types";
import { TypedData } from "abitype";
import { SignableMessage, Hex, TypedDataDefinition } from "viem";
import { useActiveAccount } from "thirdweb/react";

export function CoursePurchaseDialog({
  open,
  handleOpen,
  resource,
}: {
  open: boolean;
  handleOpen: () => void;
  resource: Course;
}) {
  const { marketplaceId } = useParams<{ marketplaceId: string }>();
  const account = useActiveAccount();
  console.log({
    id: resource.id,
    img: resource.image_url,
    title: resource.title,
    description: resource.description,
  });

  const router = useRouter();

  const handleConfirm = async () => {
    var loader = toast.loading("Purchasing course...");
    try {
      const tx = prepareContractCall({
        contract: contract(tenderlyEduChain),
        method:
          "function purchaseResource(uint256 resourceId, uint256 marketplaceId) public payable",
        params: [BigInt(resource.id), BigInt(marketplaceId)],
        value: BigInt(resource.price),
      });

      if (!account) {
        toast.dismiss(loader);
        toast.error("Please connect your wallet");
        return;
      }

      const res = await sendAndConfirmTransaction({
        account: account,
        transaction: tx,
      });

      if (res.status === "success") {
        toast.dismiss(loader);
        toast.success("Course purchased successfully");
        router.push(`/${marketplaceId}/owned/${resource.resourceHash}`);
      } else {
        toast.dismiss(loader);
        toast.error("Error purchasing course");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss(loader);
      toast.error("Error purchasing course");
    }

    handleOpen();
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
          {resource.title}
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {" "}
          <div className="space-y-4">
            <p className="text-lg font-semibold">{resource.description}</p>
            <p className="text-sm text-gray-600">Price: {toEther(BigInt(resource.price))} ETH</p>
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
            color={primary}
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
