"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Course } from "@/types/types";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { eduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { setOwnedResources } from "@/lib/features/ownedResources/ownedResourcesSlice";

const Owned = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const data = useAppSelector((state) => state.ownedResources.ownedResources);
  const setData = (data: Course[]) => dispatch(setOwnedResources(data));
  const account = useActiveAccount();
  const dispatch = useAppDispatch();
  const { data: categoryOptions } = useReadContract({
    contract: contract(eduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/boughtResources/${account.address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const resources: Course[] = data.data.map(
            (resource: any) => resource.resource
          );
          setData(resources);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  const handleOpen = (course: Course) => {
    router.push(`/owned/${course.resourceHash}`);
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
