"use client";
import { Card, Typography } from "@material-tailwind/react";
import { toEther } from "thirdweb";

const TABLE_HEAD = ["Course", "Creation Date", "Ownership", "Revenue"];

export function RevenueTable({
  data,
}: {
  data: {
    course: string;
    creation: string;
    ownership: string;
    revenue: string;
  }[];
}) {
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
                  {/* {transaction.creation} */}
                  {new Date(Number(transaction.creation) * 1000).toDateString()}
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
                  {toEther(
                    BigInt(transaction.revenue)
                  )}{" "}
                  ETH
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
