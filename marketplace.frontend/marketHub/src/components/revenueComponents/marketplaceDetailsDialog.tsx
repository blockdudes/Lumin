"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import SalesChart from "@/components/analyticsComponents/salesChart";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function MarketplaceDetailsDialog({
  open,
  handleOpen,
  marketData,
}: {
  open: boolean;
  handleOpen: () => void;
  marketData: { Market: string; creation: string; revenue: string };
}) {
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
          <div className="flex justify-between items-center w-full">
            <p>{marketData.Market}</p>
            <XMarkIcon
              className="w-5 h-5 cursor-pointer"
              onClick={handleOpen}
            />
          </div>
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {marketData ? (
            <>
              <div className="flex items-center gap-x-16">
                <p>Creation Date: {marketData.creation}</p>
                <p>Revenue: {marketData.revenue}</p>
              </div>
              <SalesChart />
            </>
          ) : (
            <p>No market data available.</p>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
