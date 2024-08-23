"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { Course } from "@/types/types";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useActiveAccount } from "thirdweb/react";

const CreatedCourses = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const account = useActiveAccount();
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/resources/${account.address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setData(data.data);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  const handleOpen = (course: Course) => {
    console.log("clicked");
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
        <MultiSelect onChange={handleCategoryChange} />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-3 gap-5 pt-4">
          {filteredData.map((course, index) => (
            <CourseCard
              key={index}
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

export default CreatedCourses;
