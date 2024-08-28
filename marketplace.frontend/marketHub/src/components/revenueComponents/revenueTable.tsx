"use client";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketplaceDetailsDialog } from "@/components/revenueComponents/marketplaceDetailsDialog"; // Import the MarketplaceDetails component
import { toEther } from "thirdweb";

interface MarketData {
  market: string;
  creation: string;
  revenue: string;
}

const TABLE_HEAD = [
  "Market Place",
  "Creation Date",
  "Revenue",
  //  "Details"
];

export function RevenueTable({ data }: { data: MarketData[] }) {
  const [open, setOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<MarketData>({
    market: "",
    creation: "",
    revenue: "",
  });

  const router = useRouter();

  const handleClick = (marketData: MarketData) => {
    setSelectedMarket(marketData); // Set the selected market data
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <>
      <MarketplaceDetailsDialog
        open={open}
        handleOpen={handleClose}
        marketData={selectedMarket}
      />
      <div className="relative shadow-md sm:rounded-lg max-h-[450px] overflow-x-auto overflow-y-scroll">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-md uppercase bg-blue-gray-50 sticky top-0 z-10 text-blue-500">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="py-5 px-6 border-b border-blue-gray-100"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <tr key={index} className="bg-white even:bg-blue-gray-50">
                <td className="py-4 px-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {transaction.market}
                  </Typography>
                </td>
                <td className="py-4 px-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {new Date(
                      Number(transaction.creation) * 1000
                    ).toDateString()}
                  </Typography>
                </td>
                <td className="py-4 px-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {toEther(
                      BigInt(transaction.revenue)
                    )}{" "}
                    ETH
                  </Typography>
                </td>
                {/* <td className="py-4 px-6">
                  <Button
                    size="sm"
                    variant="outlined"
                    color="red"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={() => handleClick(transaction)}
                  >
                    Details
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
