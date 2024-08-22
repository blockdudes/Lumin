import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Chapter } from "@/types/types";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { tenderlyEduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { ethers, hashMessage } from "ethers";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
interface CreateCourseDialogProps {
  open: boolean;
  onClose: () => void;
  chapters: Chapter[];
}

export function CreateCourseDialog({
  open,
  onClose,
  chapters,
}: CreateCourseDialogProps) {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<number>(0);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isCustomCategory, setIsCustomCategory] = useState<boolean>(false);
  // TODO: get Image from the user
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  // TODO: select category from the user
  const [category, setCategory] = useState<string>("");
  const account = useActiveAccount();
  const router = useRouter();
  const {
    data: categoryOptions,
    error,
    status,
  } = useReadContract({
    contract: contract(tenderlyEduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  const handleCreateCourse = async () => {
    var loader = toast.loading("Creating Course", {
      duration: Infinity,
    });
    try {
      const hash = hashMessage(
        courseName +
          courseDescription +
          coursePrice.toString() +
          isPublic.toString() +
          chapters.toString()
      );

      const formData = new FormData();
      formData.append("hash", "hash");
      formData.append("title", courseName);
      formData.append("description", courseDescription);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      chapters.forEach((chapter, index) => {
        const { file, ...chapterData } = chapter;

        formData.append(`chapter-${index}`, JSON.stringify(chapterData));
        if (file) {
          formData.append(`files-${index}`, file);
        }
      });

      const response = await axios.post("/api/resource/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      if (response.status == 200) {
        toast.success("Course Files Uploaded Successfully");
        toast.dismiss(loader);
        loader = toast.loading("Deploying Course on Blockchain");
      } else {
        toast.error("Error Uploading Course Files");
        return;
      }

      const tx = prepareContractCall({
        contract: contract(tenderlyEduChain),
        method:
          "function addResource(string memory title, string memory description, string memory category, string memory image_url, string memory resourceIpfsHash, bool allowListingAccess, uint256 price) external",
        params: [
          courseName,
          courseDescription,
          category,
          thumbnail ? URL.createObjectURL(thumbnail) : "",
          hash,
          isPublic,
          ethers.parseEther(coursePrice.toString()),
        ],
      });

      if (!account) {
        toast.error("Account not found");
        return;
      }

      const res = await sendAndConfirmTransaction({
        account: account,
        transaction: tx,
      });
      if (res.status === "success") {
        toast.success("Course created successfully");
        onClose();
        router.push("/");
      } else {
        toast.error("Error creating course");
      }
    } catch (e) {
      toast.error("Error creating course");
      console.error(e);
    }
    toast.dismiss(loader);
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
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              color="blue"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              label="Course Name"
              type="text"
              color="blue"
              variant="outlined"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Textarea
              label="Course Description"
              color="blue"
              variant="outlined"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Input
              label="Price"
              type="number"
              color="blue"
              variant="outlined"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
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
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center justify-end">
                <span>Custom Category</span>
                <Switch
                  checked={isCustomCategory}
                  onChange={(e) => setIsCustomCategory(e.target.checked)}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  color="blue"
                />
              </div>
              <Select
                label="Select Version"
                disabled={isCustomCategory} // Disable Select when isCustomCategory is true
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Input
                label="Category"
                type="text"
                color="blue"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!isCustomCategory} // Disable Input when isCustomCategory is false
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
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
            onClick={handleCreateCourse}
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