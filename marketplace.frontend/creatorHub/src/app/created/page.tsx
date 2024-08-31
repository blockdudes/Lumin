"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { Course } from "@/types/types";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { eduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { setCreatedResources } from "@/lib/features/createdResources/createdResourcesSlice";
import { UpdateCourseDialog } from "@/components/courseComponents/updateCourseDialog";

const CreatedCourses = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const account = useActiveAccount();
  const data = useAppSelector(
    (state) => state.createdResources.createdResources
  );
  const setData = (newData: Course[]) => dispatch(setCreatedResources(newData));
  const { data: categoryOptions } = useReadContract({
    contract: contract(eduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenUpdateDialog = (course: Course) => {
    setSelectedCourse(course);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedCourse(null);
  };

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/resources/${account.address}`, {
        cache: "no-cache",
        next: {
          revalidate: 0,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.data);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  const handleOpen = (course: Course) => {
    router.push(`/created/${course.resourceHash}`);
  };

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
          {filteredData.map((course, index) => (
            <CourseCard
              key={index}
              img={course.image_url}
              title={course.title}
              description={course.description}
              onClick={() => handleOpenUpdateDialog(course)}
            />
          ))}
        </div>
      </div>
      {selectedCourse && (
        <UpdateCourseDialog
          open={updateDialogOpen}
          onClose={handleCloseUpdateDialog}
          courseData={{
            id: selectedCourse.id,
            name: selectedCourse.title,
            description: selectedCourse.description,
            price: selectedCourse.price,
            isPublic: selectedCourse.allowListingAccess,
            image_url: selectedCourse.image_url,
            category: selectedCourse.category,
          }}
        />
      )}
    </div>
  );
};

export default CreatedCourses;
