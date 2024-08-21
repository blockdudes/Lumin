"use client";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React from "react";
import InputColor from "react-input-color";

const CreateCourse = () => {
  const [color, setColor] = React.useState({ hex: "#111111" });

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
            <div className="w-full flex items-center gap-4">
              
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
