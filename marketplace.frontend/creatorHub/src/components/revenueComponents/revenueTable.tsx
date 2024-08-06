"use client";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Course", "Creation Date", "Ownership", "Revenue"];

const TABLE_ROWS = [
  {
    course: "Course A",
    creation: "01/01/22",
    ownership: "Public",
    revenue: "$10,000",
  },
  {
    course: "Course B",
    creation: "15/02/22",
    ownership: "Private",
    revenue: "$7,500",
  },
  {
    course: "Course A",
    creation: "01/01/22",
    ownership: "Public",
    revenue: "$10,000",
  },
  {
    course: "Course B",
    creation: "15/02/22",
    ownership: "Private",
    revenue: "$7,500",
  },
  {
    course: "Course A",
    creation: "01/01/22",
    ownership: "Public",
    revenue: "$10,000",
  },
  {
    course: "Course B",
    creation: "15/02/22",
    ownership: "Private",
    revenue: "$7,500",
  },
  {
    course: "Course A",
    creation: "01/01/22",
    ownership: "Public",
    revenue: "$10,000",
  },
  {
    course: "Course B",
    creation: "15/02/22",
    ownership: "Private",
    revenue: "$7,500",
  },
  {
    course: "Course A",
    creation: "01/01/22",
    ownership: "Public",
    revenue: "$10,000",
  },
  {
    course: "Course B",
    creation: "15/02/22",
    ownership: "Private",
    revenue: "$7,500",
  },
  {
    course: "Course C",
    creation: "10/03/22",
    ownership: "Public",
    revenue: "$5,200",
  },
  {
    course: "Course D",
    creation: "20/04/22",
    ownership: "Private",
    revenue: "$3,400",
  },
  {
    course: "Course E",
    creation: "05/05/22",
    ownership: "Public",
    revenue: "$8,100",
  },
];

export function RevenueTable() {
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
                  {transaction.ownership}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
