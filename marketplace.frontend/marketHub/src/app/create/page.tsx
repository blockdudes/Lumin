"use client";
import { MultiSelect } from "@/components/createComponents/multiselect";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React, { useState } from "react";

const CreateCourse = () => {
  const [selectedColorSet, setSelectedColorSet] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="flex flex-col gap-4">
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-full"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Marketplace Orientation</div>
            <Select
              label="Select Version"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Option>General Marketplace</Option>
              <Option>Owned Resources Marketplace</Option>
            </Select>
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-full"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Name of the Marketplace</div>
            <Input
              placeholder="Enter the name of the marketplace"
              className="w-full"
              color="red"
              label="Name"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <div className="text-xl font-bold">
              Description of the Marketplace
            </div>
            <Input
              placeholder="Enter the description of the marketplace"
              className="w-full"
              color="red"
              label="Description"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-[820px]"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Thumbnail</div>
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
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-[820px]"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Price Percentage</div>
            <Input
              placeholder="Enter the price percentage"
              className="w-full"
              color="red"
              type="number"
              label="Price percentage"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-[820px]"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Select Categories</div>
            <MultiSelect onChange={handleCategoryChange} />
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-full"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Select the color theme </div>
            <div className="w-full flex  gap-20 ">
              <label className="flex gap-4">
                <input
                  type="radio"
                  name="colorSet"
                  value="blue-white"
                  checked={selectedColorSet === "blue-white"}
                  onChange={() => setSelectedColorSet("blue-white")}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-blue-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-white rounded-r-md"></div>
                </div>
              </label>
              <label className="flex gap-4">
                <input
                  type="radio"
                  name="colorSet"
                  value="blue-gray"
                  checked={selectedColorSet === "red-white"}
                  onChange={() => setSelectedColorSet("red-white")}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-red-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-white rounded-r-md"></div>
                </div>
              </label>
              <label className="flex gap-4">
                <input
                  type="radio"
                  name="colorSet"
                  value="yellow-white"
                  checked={selectedColorSet === "yellow-white"}
                  onChange={() => setSelectedColorSet("yellow-white")}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-yellow-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-white rounded-r-md"></div>
                </div>
              </label>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button
          color="red"
          className="mt-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateCourse;
