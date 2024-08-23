"use client";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {MarketplaceDetailsDialog} from "@/components/revenueComponents/marketplaceDetailsDialog"; // Import the MarketplaceDetails component

interface MarketData {
  Market: string;
  creation: string;
  revenue: string;
}

const TABLE_HEAD = ["Market Place", "Creation Date", "Revenue", "Details"];

const TABLE_ROWS = [
  {
    Market: "Market A",
    creation: "01/01/22",
    revenue: "$10,000",
  },
  {
    Market: "Market B",
    creation: "15/02/22",
    revenue: "$7,500",
  },
  {
    Market: "Market A",
    creation: "01/01/22",
    revenue: "$10,000",
  },
  {
    Market: "Market B",
    creation: "15/02/22",
    revenue: "$7,500",
  },
  {
    Market: "Market A",
    creation: "01/01/22",
    revenue: "$10,000",
  },
  {
    Market: "Market B",
    creation: "15/02/22",
    revenue: "$7,500",
  },
  {
    Market: "Market A",
    creation: "01/01/22",
    revenue: "$10,000",
  },
  {
    Market: "Market B",
    creation: "15/02/22",
    revenue: "$7,500",
  },
  {
    Market: "Market A",
    creation: "01/01/22",
    revenue: "$10,000",
  },
  {
    Market: "Market B",
    creation: "15/02/22",
    revenue: "$7,500",
  },
  {
    Market: "Market C",
    creation: "10/03/22",
    revenue: "$5,200",
  },
  {
    Market: "Market D",
    creation: "20/04/22",
    revenue: "$3,400",
  },
  {
    Market: "Market E",
    creation: "05/05/22",
    revenue: "$8,100",
  },
];

export function RevenueTable() {
  const [open, setOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState({ Market: '', creation: '', revenue: '' });

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
      <MarketplaceDetailsDialog open={open} handleOpen={handleClose} marketData={selectedMarket} />
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
            {TABLE_ROWS.map((transaction, index) => (
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
                    {transaction.Market}
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
                    {transaction.creation}
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
                    {transaction.revenue}
                  </Typography>
                </td>
                <td className="py-4 px-6">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}