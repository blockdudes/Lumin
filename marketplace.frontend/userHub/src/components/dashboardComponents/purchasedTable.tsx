"use client";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Course", "Purchase Date", "Market Place" , "Amount"];

const TABLE_ROWS = [
  {
    course: "Course A",
    purchaseDate: "01/01/22",
    marketPlace: "Platform X",
    amount: "$10,000",
  },
  {
    course: "Course B",
    purchaseDate: "15/02/22",
    marketPlace: "Platform Y",
    amount: "$7,500",
  },
  {
    course: "Course A",
    purchaseDate: "01/01/22",
    marketPlace: "Platform X",
    amount: "$10,000",
  },
  {
    course: "Course B",
    purchaseDate: "15/02/22",
    marketPlace: "Platform Y",
    amount: "$7,500",
  },
  {
    course: "Course A",
    purchaseDate: "01/01/22",
    marketPlace: "Platform X",
    amount: "$10,000",
  },
  {
    course: "Course B",
    purchaseDate: "15/02/22",
    marketPlace: "Platform Y",
    amount: "$7,500",
  },
  {
    course: "Course A",
    purchaseDate: "01/01/22",
    marketPlace: "Platform X",
    amount: "$10,000",
  },
  {
    course: "Course B",
    purchaseDate: "15/02/22",
    marketPlace: "Platform Y",
    amount: "$7,500",
  },
  {
    course: "Course A",
    purchaseDate: "01/01/22",
    marketPlace: "Platform X",
    amount: "$10,000",
  },
  {
    course: "Course B",
    purchaseDate: "15/02/22",
    marketPlace: "Platform Y",
    amount: "$7,500",
  },
  {
    course: "Course C",
    purchaseDate: "10/03/22",
    marketPlace: "Platform Z",
    amount: "$5,200",
  },
  {
    course: "Course D",
    purchaseDate: "20/04/22",
    marketPlace: "Platform X",
    amount: "$3,400",
  },
  {
    course: "Course E",
    purchaseDate: "05/05/22",
    marketPlace: "Platform Y",
    amount: "$8,100",
  },
  {
    course: "Course F",
    purchaseDate: "12/06/22",
    marketPlace: "Platform Z",
    amount: "$4,300",
  },
  {
    course: "Course G",
    purchaseDate: "25/07/22",
    marketPlace: "Platform X",
    amount: "$6,750",
  },
  {
    course: "Course H",
    purchaseDate: "30/08/22",
    marketPlace: "Platform Y",
    amount: "$9,200",
  },
  {
    course: "Course I",
    purchaseDate: "15/09/22",
    marketPlace: "Platform Z",
    amount: "$3,100",
  },
  {
    course: "Course J",
    purchaseDate: "20/10/22",
    marketPlace: "Platform X",
    amount: "$8,500",
  },
  {
    course: "Course K",
    purchaseDate: "05/11/22",
    marketPlace: "Platform Y",
    amount: "$2,800",
  },
  {
    course: "Course L",
    purchaseDate: "10/12/22",
    marketPlace: "Platform Z",
    amount: "$5,600",
  },
  {
    course: "Course M",
    purchaseDate: "21/01/23",
    marketPlace: "Platform X",
    amount: "$7,300",
  },
  {
    course: "Course N",
    purchaseDate: "02/02/23",
    marketPlace: "Platform Y",
    amount: "$4,400",
  },
  {
    course: "Course O",
    purchaseDate: "14/03/23",
    marketPlace: "Platform Z",
    amount: "$8,900",
  },
  {
    course: "Course P",
    purchaseDate: "25/04/23",
    marketPlace: "Platform X",
    amount: "$3,500",
  },
  {
    course: "Course Q",
    purchaseDate: "05/05/23",
    marketPlace: "Platform Y",
    amount: "$6,100",
  },
  {
    course: "Course R",
    purchaseDate: "16/06/23",
    marketPlace: "Platform Z",
    amount: "$9,000",
  },
  {
    course: "Course S",
    purchaseDate: "27/07/23",
    marketPlace: "Platform X",
    amount: "$2,700",
  },
  {
    course: "Course T",
    purchaseDate: "07/08/23",
    marketPlace: "Platform Y",
    amount: "$4,800",
  },
];

export function PurchasedTable() {
  return (
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
                  {transaction.course}
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
                  {transaction.purchaseDate}
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
                  {transaction.marketPlace}
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
                  {transaction.amount}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}