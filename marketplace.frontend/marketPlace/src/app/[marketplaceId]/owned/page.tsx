"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Course } from "@/types/types";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { tenderlyEduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";

const Owned = () => {
  const router = useRouter();
  const { marketplaceId } = useParams<{ marketplaceId: string }>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // TODO: fetch purchased courses
  const account = useActiveAccount();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Course[]>([]);
  const { data: categoryOptions } = useReadContract({
    contract: contract(tenderlyEduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      // TODO: change api endpoint
      fetch(`/api/purchasedResources/${account.address}`)
        .then((res) => res.json())
        .then((data) => {
          const resources: Course[] = data.data.map(
            (resource: Course) => resource
          );
          setData(resources);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  const handleOpen = (course: Course) => {
    router.push(`/${marketplaceId}/owned/${course.resourceHash}`);
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
    </div>
  );
};

export default Owned;
