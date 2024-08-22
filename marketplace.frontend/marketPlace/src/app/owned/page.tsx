"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { CoursePurchaseDialog } from "@/components/courseComponents/coursePurchaseDialog";

interface Course {
  id: string;
  img: string;
  title: string;
  description: string;
}

const data: Course[] = [
  {
    id: "owned1",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
  },
  {
    id: "owned2",
    img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Review Check",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
  },
];

const Course = () => {
  const router = useRouter();

  const handleOpen = (course: Course) => {
    router.push(`/owned/${course.id}`);
  };


  return (
    <div>
      <div className="text-2xl font-bold">Courses</div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-3 gap-5 pt-4">
          {data.map((course) => (
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
    </div>
  );
};

export default Course;