import React from "react";
import courses from "../assets/courses_minified.json";
import StudentForm from "./StudentForm";

const Planner = () => {
  const coreCourses = courses.courses.core;
  const otherCourses = courses.courses.other;
  return (
    <div>
      <StudentForm coreCourses={coreCourses} otherCourses={otherCourses} />
    </div>
  );
};

export default Planner;
