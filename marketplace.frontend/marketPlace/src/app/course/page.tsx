"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { CoursePurchaseDialog } from "@/components/courseComponents/coursePurchaseDialog";

interface Course {
  id: string;
  img: string;
  title: string;
  description: string;
  category: string;
}

const data: Course[] = [
  {
    id: "course1",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "business",
  },
  {
    id: "course2",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "business",
  },
  {
    id: "course3",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "arts",
  },
  {
    id: "course4",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "web3",
  },
  {
    id: "course5",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "web3",
  },
  {
    id: "course6",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
    category: "arts",
  },
];

const Owned = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

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
        <MultiSelect onChange={handleCategoryChange} />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-3 gap-5 pt-4">
          {filteredData.map((course) => (
            <CourseCard
              key={course.id}
              img={course.img}
              title={course.title}
              description={course.description}
              onClick={() => handleOpen(course)}
            />
          ))}
        </div>
      </div>
      {selectedCourse && (
        <CoursePurchaseDialog
          id={selectedCourse.id}
          open={open}
          handleOpen={handleClose}
          img={selectedCourse.img}
          title={selectedCourse.title}
          description={selectedCourse.description}
        />
      )}
    </div>
  );
};

export default Owned;
