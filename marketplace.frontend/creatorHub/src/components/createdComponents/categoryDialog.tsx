import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";

export function CategoryDialog({
  category,
  open,
  handleOpen,
}: {
  category: string;
  open: boolean;
  handleOpen: () => void;
}) {
  const [isCustomCategory, setIsCustomCategory] = React.useState(false);
  const [updatedCategory, setUpdatedCategory] = React.useState(category);
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
          Edit Category
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
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
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
              disabled={!isCustomCategory} // Disable Input when isCustomCategory is false
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
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
            onClick={handleOpen}
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
