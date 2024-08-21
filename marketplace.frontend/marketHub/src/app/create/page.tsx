"use client";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";

const CreateCourse = () => {
  const [selectedColorSet, setSelectedColorSet] = React.useState("");

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-col gap-4">
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
            <div className="text-xl font-bold">Select the theme color</div>
            <div className="w-full flex flex-col gap-4 ">
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
                  checked={selectedColorSet === "blue-gray"}
                  onChange={() => setSelectedColorSet("blue-gray")}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-blue-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-gray-700 rounded-r-md"></div>
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
