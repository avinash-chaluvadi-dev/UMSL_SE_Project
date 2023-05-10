import React, { useState } from "react";
import "../styles/StudentForm.css";
import Select from "react-select";
import DegreePlan from "../components/DegreePlan";
import Error from "../components/Error";
import { Button, Paper } from "@mui/material";

function StudentForm({ coreCourses, otherCourses }) {
  const [degreePlan, setDegreePlan] = useState(false);
  const [courseTaken, setCourseTaken] = useState([]);

  const [studentType, setStudentType] = useState("new");
  const [semesterCount, setSemesterCount] = useState(8);
  const [summerSemester, setSummerSemester] = useState(false);
  const [summerCredits, setSummerCredits] = useState(3);
  const [introStudent, setIntroStudent] = useState(false);
  const [semesterCredits, setSemesterCredits] = useState(15);
  const [computerScience, setComputerScience] = useState("");
  const [generalRequirements, setGeneralRequirements] = useState("");
  // const [culturalDiversity, setCulturalDiversity] = useState(false);
  // const [engl3130, setEngl3130] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cs_data = [
    ...coreCourses.filter((course) => course.subject == "CMP SCI"),
    ...otherCourses.filter((course) => course.subject == "CMP SCI"),
  ];
  const general_data = [
    ...coreCourses.filter((course) => course.subject != "CMP SCI"),
    ...otherCourses.filter((course) => course.subject != "CMP SCI"),
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = "";

    const formData = {
      studentType,
      semesterCount,
      summerSemester,
      summerCredits: summerSemester ? summerCredits : "",
      introStudent,
      semesterCredits,
      computerScience: studentType == "existing" ? computerScience : "",
      generalRequirements: studentType == "existing" ? generalRequirements : "",
      // culturalDiversity: studentType == "existing" ? culturalDiversity : false,
      // engl3130: studentType == "existing" ? engl3130 : false,
    };

    if (!semesterCount) {
      error = "Please enter the number of Semesters you would like to take.";
      return;
    } else if (summerSemester && (!summerCredits || summerCredits < 3)) {
      error =
        "Please enter a number of credits for the summer semester that is 3 or greater.";
    } else if (!semesterCredits || semesterCredits < 6) {
      error =
        "Please enter a number of credits for the spring/fall semester that is 6 or greater.";
    } else if (introStudent && semesterCredits < 15) {
      error =
        "As you are an international student, the minimum credit requirement per semester is 15.";
     } 
    //  else if (semesterCount * semesterCredits < 120) {
    //   error =
    //     "Minimum credits should be 120 so either increase the semester credits or the semester count.";
    // }
    setErrorMessage((oldValue) => error);

    if (!error) {
      setDegreePlan(true);
      setCourseTaken([
        ...cs_options.filter((obj) => computerScience.includes(obj.value)),
        ...general_options.filter((obj) =>
          generalRequirements.includes(obj.value)
        ),
      ]);
      // culturalDiversity
      //   ? setCourseTaken((oldValue) => [
      //       ...oldValue,
      //       {
      //         subject: "Cultural Diversity Requirement",
      //         course_number: "",
      //         course_name: "Cultural Diversity",
      //         credit: "3",
      //         course_description: "",
      //       },
      //     ])
      //   : null;
      // engl3130
      //   ? setCourseTaken((oldValue) => [
      //       ...oldValue,
      //       {
      //         subject: "ENGL",
      //         course_number: "3130",
      //         course_name: "Technical Writing",
      //         credit: "3",
      //         course_description: "",
      //       },
      //     ])
      //   : null;
    }
  };

  const handleMultiSelect = (e, setValue) => {
    setValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const cs_options = [
    ...cs_data.map((course) => ({
      ...course,
      value: course.subject + " " + course.course_number,
      label: `${course.course_name} (${course.course_number})`,
    })),
  ];

  const general_options = [
    ...general_data.map((course) => ({
      ...course,
      value: course.subject + " " + course.course_number,
      label: `${course.course_name} (${course.course_number})`,
    })),
  ];

  return (
    <>
      {!degreePlan ? (
        <div className="StudentForm-container">
          <h2>Student Form</h2>
          <Paper elevation={2}>
            <form className="StudentForm" onSubmit={handleSubmit}>
              <Error message={errorMessage} />
              <div className="form-group">
                <label>Student Type</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="studentType"
                      value="new"
                      checked={studentType === "new"}
                      onChange={() => setStudentType("new")}
                    />
                    New
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="studentType"
                      value="existing"
                      checked={studentType === "existing"}
                      onChange={() => setStudentType("existing")}
                    />
                    Existing
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="semesterCount">
                  Number of semesters you're willing to take
                </label>
                <input
                  type="number"
                  id="semesterCount"
                  value={semesterCount}
                  onChange={(e) => setSemesterCount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Summer semester</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="summerSemester"
                      value="yes"
                      checked={summerSemester}
                      onChange={() => setSummerSemester(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="summerSemester"
                      value="no"
                      checked={!summerSemester}
                      onChange={() => setSummerSemester(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              {summerSemester && (
                <div className="form-group">
                  <label htmlFor="summerCredits">
                    Number of credits for summer semester
                  </label>
                  <input
                    type="number"
                    id="summerCredits"
                    value={summerCredits}
                    onChange={(e) => setSummerCredits(e.target.value)}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Are you an international student?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="introStudent"
                      value="yes"
                      checked={introStudent}
                      onChange={() => setIntroStudent(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="introStudent"
                      value="no"
                      checked={!introStudent}
                      onChange={() => setIntroStudent(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="semesterCredits">
                  Number of credits per semester (Fall/Spring)
                </label>
                <input
                  type="number"
                  id="semesterCredits"
                  value={semesterCredits}
                  onChange={(e) => setSemesterCredits(e.target.value)}
                />
              </div>
              {studentType === "existing" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="computerScience">Computer Science</label>
                    <Select
                      options={cs_options}
                      isMulti
                      value={cs_options.filter((obj) =>
                        computerScience.includes(obj.value)
                      )} // set selected values
                      onChange={(e) => handleMultiSelect(e, setComputerScience)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="generalRequirements">
                      General Requirements
                    </label>
                    <Select
                      options={general_options}
                      isMulti
                      value={general_options.filter((obj) =>
                        generalRequirements.includes(obj.value)
                      )} // set selected values
                      onChange={(e) =>
                        handleMultiSelect(e, setGeneralRequirements)
                      }
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>Did you take Cultural Diversity?</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="culturalDiversity"
                          value="yes"
                          checked={culturalDiversity}
                          onChange={() => setCulturalDiversity(true)}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="culturalDiversity"
                          value="no"
                          checked={!culturalDiversity}
                          onChange={() => setCulturalDiversity(false)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Did you take ENGL3130?</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="engl3130"
                          value="yes"
                          checked={engl3130}
                          onChange={() => setEngl3130(true)}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="engl3130"
                          value="no"
                          checked={!engl3130}
                          onChange={() => setEngl3130(false)}
                        />
                        No
                      </label>
                    </div>
                  </div> */}
                </>
              ) : null}
              <Button variant="contained" type="submit" className="submit-btn">
                Submit
              </Button>
            </form>
          </Paper>
        </div>
      ) : (
        <DegreePlan
          numOfSemesters={semesterCount}
          semCredits={semesterCredits}
          courseTaken={courseTaken}
          // culturalDiversity={culturalDiversity}
          // engl3130={engl3130}
          summerSemester={summerSemester}
          summerCredits={summerCredits}
        />
      )}
    </>
  );
}

export default StudentForm;
