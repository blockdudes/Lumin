"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { CoursePurchaseDialog } from "@/components/courseComponents/coursePurchaseDialog";
import { tenderlyEduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Course } from "@/types/types";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";

const Owned = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const [data, setData] = useState<Course[]>([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const account = useActiveAccount();
  const { data: categoryOptions } = useReadContract({
    contract: contract(tenderlyEduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/getAllowListedResource`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  const handleOpen = (course: Course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const filteredData =
    selectedCategories.length > 0
      ? data.filter((course) => selectedCategories.includes(course.category))
      : data;

  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="flex gap-2 items-center">
        <div className="text-2xl font-bold">Courses</div>
        <MultiSelect
          options={
            categoryOptions !== undefined
              ? categoryOptions.map((option) => ({
                  value: option,
                  label: option,
                }))
              : undefined
          }
          onChange={handleCategoryChange}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-3 gap-5 pt-4">
          {filteredData.map((course) => (
            <CourseCard
              key={course.id}
              img={course.image_url}
              title={course.title}
              description={course.description}
              onClick={() => handleOpen(course)}
            />
          ))}
        </div>
      </div>
      {selectedCourse && (
        <CoursePurchaseDialog
          open={open}
          handleOpen={handleClose}
          resource={selectedCourse}
        />
      )}
    </div>
  );
};

export default Owned;
