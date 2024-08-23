"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TitleDialog } from "@/components/createdComponents/titleDialog";
import { DescriptionDialog } from "@/components/createdComponents/descriptioDialog";
import { ImageDialog } from "@/components/createdComponents/imageDialog";
import { CategoryDialog } from "@/components/createdComponents/categoryDialog";
import { PriceDialog } from "@/components/createdComponents/priceComponent";
import { PublicDialog } from "@/components/createdComponents/publicDialog";

const CreatedCourseDetails = () => {
  const pathname = usePathname();
  const courseId = pathname.split("/").pop();
  console.log(courseId);

  const [openTitleDialog, setOpenTitleDialog] = React.useState(false);
  const [openDescriptionDialog, setOpenDescriptionDialog] =
    React.useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);
  const [openPriceDialog, setOpenPriceDialog] = React.useState(false);
  const [openPublicDialog, setOpenPublicDialog] = React.useState(false);
  const [openImageDialog, setOpenImageDialog] = React.useState(false);

  const courseDetails = {
    id: "owned1",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "web3",
    price: 10,
    isPublic: true,
  };

  return (
    <div>
      <div className="px-10 py-8 flex flex-col gap-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="group relative flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">
            {courseDetails.title}
          </h1>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PencilSquareIcon
              className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setOpenTitleDialog(true)}
            />
          </span>
        </div>
        <div className="group relative w-full h-80">
          <img
            src={courseDetails.img}
            alt={courseDetails.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PencilSquareIcon
              className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setOpenImageDialog(true)}
            />
          </span>
        </div>
        <div className="group relative">
          <p className="text-gray-600 text-lg">{courseDetails.description}</p>
          <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PencilSquareIcon
              className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setOpenDescriptionDialog(true)}
            />
          </span>
        </div>
        <div className="group relative flex justify-between items-center">
          <p className="font-semibold text-lg">
            Category: {courseDetails.category}
          </p>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PencilSquareIcon
              className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setOpenCategoryDialog(true)}
            />
          </span>
        </div>
        <div className="group relative flex justify-between items-center">
          <p className="font-semibold text-lg">Price: ${courseDetails.price}</p>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PencilSquareIcon
              className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setOpenPriceDialog(true)}
            />
          </span>
        </div>
        <div className="group relative flex justify-between items-center">
          <p className="font-semibold text-lg">
            Listed: {courseDetails.isPublic ? "Yes" : "No"}
          </p>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PencilSquareIcon
              className="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setOpenPublicDialog(true)}
            />
          </span>
        </div>
      </div>
      <TitleDialog
        open={openTitleDialog}
        handleOpen={() => setOpenTitleDialog(!openTitleDialog)}
        title={courseDetails.title}
      />
      <ImageDialog
        open={openImageDialog}
        handleOpen={() => setOpenImageDialog(!openImageDialog)}
        image={courseDetails.img}
      />
      <DescriptionDialog
        open={openDescriptionDialog}
        handleOpen={() => setOpenDescriptionDialog(!openDescriptionDialog)}
        description={courseDetails.description}
      />
      <CategoryDialog
        open={openCategoryDialog}
        handleOpen={() => setOpenCategoryDialog(!openCategoryDialog)}
        category={courseDetails.category}
      />
      <PriceDialog
        open={openPriceDialog}
        handleOpen={() => setOpenPriceDialog(!openPriceDialog)}
        price={courseDetails.price}
      />
      <PublicDialog
        open={openPublicDialog}
        handleOpen={() => setOpenPublicDialog(!openPublicDialog)}
        isPublic={courseDetails.isPublic}
      />
    </div>
  );
};

export default CreatedCourseDetails;
