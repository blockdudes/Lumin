import React, { use, useState } from "react";
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
  Spinner,
} from "@material-tailwind/react";
import { Chapter } from "@/types/types";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { eduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { ethers, hashMessage } from "ethers";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AddCategoryDialog } from "./addCategoryDialog";

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
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("x");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openAddCategoryDialog, setOpenAddCategoryDialog] =
    useState<boolean>(false);

  const account = useActiveAccount();
  const router = useRouter();

  const { data: categoryOptions } = useReadContract({
    contract: contract(eduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
    queryOptions: {
      refetchInterval: 1000,
    },
  });

  const handleCreateCourse = async () => {
    setIsLoading(true);
    var loader = toast.loading("Creating Course", {
      duration: Infinity,
    });
    console.log("chapters", chapters);
    try {
      const hash = hashMessage(
        courseName +
        courseDescription +
        coursePrice.toString() +
        isPublic.toString() +
        chapters.toString() +
        Date.now().toString()
      );

      const formData = new FormData();
      formData.append("hash", hash);
      formData.append("title", courseName);
      formData.append("description", courseDescription);
      formData.append("price", coursePrice.toString());
      formData.append("category", category);
      formData.append("allowListingAccess", isPublic.toString());
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      chapters.forEach((chapter, index) => {
        const { file, ...chapterData } = chapter;

        formData.append(`chapter-${index}`, JSON.stringify(chapterData));
        if (file) {
          console.log("FILE: ", file);
          formData.append(`files-${index}`, file);
          formData.append(`type-${index}`, file.type);
        }
      });

      const response = await axios.post("/api/resources/create", formData, {
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
      console.log("Creating Course on Blockchain");
      const tx = prepareContractCall({
        contract: contract(eduChain),
        method:
          "function addResource(string memory title, string memory description, string memory category, string memory image_url, string memory resourceIpfsHash, bool allowListingAccess, uint256 price) external",
        params: [
          courseName,
          courseDescription,
          category,
          response.data.data.thumbnail_url,
          hash,
          isPublic,
          ethers.parseEther(coursePrice.toString()),
        ],
        gas: BigInt(10000000),
      });

      if (!account) {
        toast.error("Account not found");
        return;
      }

      const res = await sendAndConfirmTransaction({
        account: account,
        transaction: tx,
      });
      console.log(res);
      if (res.status === "success") {
        toast.success("Course created successfully");
        toast.dismiss(loader);
        onClose();
        router.push("/created");
      } else {
        toast.error("Error creating course");
      }
    } catch (e) {
      toast.error("Error creating course");
      console.error(e);
    }
    setIsLoading(false);
    toast.dismiss(loader);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(!openAddCategoryDialog);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={() => { }}
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
            <span>Allow Listing</span>
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
            <div className="flex gap-4">
              <Select
                label="Select Category"
                className="capitalize"
                value={category}
                onChange={(value) => {
                  if (value) {
                    console.log("value", value);
                    setCategory(value);
                  }
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {categoryOptions == null ? (
                  <div className="w-full flex justify-center items-center">
                    <Spinner
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </div>
                ) : (
                  categoryOptions?.map((option) => (
                    <Option key={option} className="capitalize" value={option}>
                      {option}
                    </Option>
                  ))
                )}
              </Select>
              <Button
                variant="gradient"
                color="blue"
                onClick={() => setOpenAddCategoryDialog(true)}
                size="sm"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span>Add </span>
              </Button>
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
            disabled={isLoading}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>
              {isLoading ? (
                <div className="flex items-center px-6 ">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="w-4 h-4"
                  />
                </div>
              ) : (
                "Confirm"
              )}
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
      <AddCategoryDialog
        open={openAddCategoryDialog}
        onClose={handleCloseAddCategoryDialog}
      />
    </>
  );
}
