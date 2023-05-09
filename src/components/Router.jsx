import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Planner from "../pages/Planner";
import Requirements from "../pages/Requirements";
import Summary from "../pages/Summary";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      {/* <Route path="/login" element={<LoginForm />}></Route> */}
      {/* <Route path="/new-student" element={<NewStudentForm />}></Route> */}
      {/* <Route path="/existing-student" element={<ExistingStudentForm />}></Route> */}
      <Route path="/requirements" element={<Requirements />}></Route>
      <Route path="/summary" element={<Summary />}></Route>
      <Route path="/planner" element={<Planner />}></Route>
    </Routes>
  );
};

export default Router;
