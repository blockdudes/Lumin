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
import { tenderlyEduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { ethers, hashMessage } from "ethers";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AddCategoryDialog } from "@/components/createComponents/addCategoryDialog";

interface UpdateCourseDialogProps {
  open: boolean;
  onClose: () => void;
  chapters: Chapter[];
  courseData: {
    name: string;
    description: string;
    price: number;
    isPublic: boolean;
    thumbnail: File | null;
    category: string;
  };
}

export function UpdateCourseDialog({
  open,
  onClose,
  chapters,
  courseData,
}: UpdateCourseDialogProps) {
  const [courseName, setCourseName] = useState<string>(courseData.name);
  const [courseDescription, setCourseDescription] = useState<string>(courseData.description);
  const [coursePrice, setCoursePrice] = useState<number>(courseData.price);
  const [isPublic, setIsPublic] = useState<boolean>(courseData.isPublic);
  const [thumbnail, setThumbnail] = useState<File | null>(courseData.thumbnail);
  const [category, setCategory] = useState<string>(courseData.category);

  const [openAddCategoryDialog, setOpenAddCategoryDialog] =
    useState<boolean>(false);

  const account = useActiveAccount();
  const router = useRouter();

  const { data: categoryOptions } = useReadContract({
    contract: contract(tenderlyEduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
    queryOptions: {
      refetchInterval: 1000,
    },
  });

  const handleCreateCourse = async () => {
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
        contract: contract(tenderlyEduChain),
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
    toast.dismiss(loader);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(!openAddCategoryDialog);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={() => {}}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Update Course
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
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
