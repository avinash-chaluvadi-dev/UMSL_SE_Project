import React, { useEffect, useState } from "react";
import courses_data from "../assets/courses_minified.json";
import rotation_data from "../assets/rotation.json";
import "../styles/DegreePlan.css";
import { Button, Paper } from "@mui/material";

const StringifyNumber = ({ n }) => {
  const special = [
    "Zeroth",
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
    "Eleventh",
    "Twelfth",
    "Thirteenth",
    "Fourteenth",
    "Fifteenth",
    "Sixteenth",
    "Seventeenth",
    "Eighteenth",
    "Nineteenth",
  ];

  const deca = [
    "Twent",
    "Thirt",
    "Fort",
    "Fift",
    "Sixt",
    "Sevent",
    "Eight",
    "Ninet",
  ];

  if (n < 20) {
    return <>{special[n]}</>;
  }
  if (n % 10 === 0) {
    return <>{deca[Math.floor(n / 10) - 2]}ieth</>;
  }
  return (
    <>
      {deca[Math.floor(n / 10) - 2]}y-{special[n % 10]}
    </>
  );
};

const DegreePlan = ({
  courseTaken,
  numOfSemesters,
  semCredits,
  summerSemester,
  summerCredits,
}) => {
  let semSeasons = summerSemester
    ? ["Fall", "Spring", "Summer"]
    : ["Fall", "Spring"];
  const [semesters, setSemesters] = useState([]);
  let taken = courseTaken;
  const [totalCreditsPrint, setTotalCredits] = useState(0);
  let totalCredits = 0;
  let cmpElectiveCredits = 0;

  const addTotalCredits = (credits) => {
    setTotalCredits((oldValue) => oldValue + parseInt(credits));
    totalCredits += parseInt(credits);
  };

  const filterCourses = (courses) => {
    for (let i = 0; i < courseTaken.length; i++) {
      let course = courseTaken[i];
      for (let j = 0; j < courses.length; j++) {
        if (
          courses[j].subject === course.subject &&
          courses[j].course_number === course.course_number
        ) {
          addTotalCredits(courses[j].credit);
          courses.splice(j, 1);
          break;
        }
      }
    }
    return courses;
  };

  const isRequirementMatched = (subject, course_number) => {
    for (let i = 0; i < taken.length; i++) {
      if (
        taken[i].subject == subject &&
        taken[i].course_number == course_number
      ) {
        return true;
      }
    }
    return false;
  };

  const checkRotation = (course, numOfSemesters) => {
    if (!course.rotation_term) return true;
    for (let i = 0; i < course.rotation_term.length; i++) {
      if (
        course.rotation_term[i].term ==
        semSeasons[numOfSemesters % semSeasons.length]
      ) {
        if (course.rotation_term[i].time_code) return true;
        return false;
      }
    }
    return false;
  };

  const canTake = (course, numOfSemesters) => {
    if (!checkRotation(course, numOfSemesters)) return false;
    if (course.prerequisite == null) return true;

    let or_choice = course.prerequisite.or_choice;
    if (!Array.isArray(or_choice)) {
      or_choice = [or_choice];
    }

    for (let i = 0; i < or_choice.length; i++) {
      if (!or_choice[i].and_required) continue;
      if (Array.isArray(or_choice[i].and_required)) {
        let allPassed = true;

        for (let j = 0; j < or_choice[i].and_required.length; j++) {
          if (typeof or_choice[i].and_required != "string") continue;
          let subject = or_choice[i].and_required[j].includes("MATH")
            ? "MATH"
            : "CMP SCI";
          let course_number = or_choice[i].and_required[j].replace(/^\D+/g, "");

          if (!isRequirementMatched(subject, course_number)) {
            allPassed = false;
            break;
          }
        }

        if (allPassed) return true;
      } else {
        if (typeof or_choice[i].and_required != "string") {
          let subject = or_choice[i].and_required["#text"].includes("MATH")
            ? "MATH"
            : "CMP SCI";
          let course_number = or_choice[i].and_required["#text"].replace(
            /\D/g,
            ""
          );
          if (isRequirementMatched(subject, course_number)) return true;
          continue;
        }
        let subject = or_choice[i].and_required.includes("MATH")
          ? "MATH"
          : "CMP SCI";
        let course_number = or_choice[i].and_required.replace(/\D/g, "");

        if (isRequirementMatched(subject, course_number)) return true;
      }
    }

    return false;
  };

  let coreCourses = filterCourses(courses_data.courses.core);
  let otherCourses = filterCourses(courses_data.courses.other);

  const rotationMapping = rotation_data.Rotations.rotation_year[
    rotation_data.Rotations.rotation_year.length - 1
  ].course.reduce((acc, item) => {
    const key = `${item.subject}-${item.course_number}`;
    acc[key] = item.rotation_term;
    return acc;
  }, {});

  coreCourses.forEach((course) => {
    const key = `${course.subject}-${course.course_number}`;
    if (rotationMapping.hasOwnProperty(key)) {
      course.rotation_term = rotationMapping[key];
    }
  });

  useEffect(() => {
    for (let i = 0; i < numOfSemesters; i++) {
      let currentCredits = 0;
      let currentSemester = [];
      let k = 0;

      while (
        (summerSemester && (i + 1) % 3 == 0
          ? summerCredits > currentCredits
          : semCredits > currentCredits) &&
        coreCourses.length > 0 &&
        k < coreCourses.length &&
        totalCredits < 120
      ) {
        if (canTake(coreCourses[k], i)) {
          currentSemester.push(coreCourses[k]);
          currentCredits += parseInt(coreCourses[k].credit);
          coreCourses.splice(k, 1);
        } else {
          k++;
        }
        if (
          cmpElectiveCredits < 15 &&
          semCredits > currentCredits &&
          semCredits - currentCredits <= 6
        ) {
          currentSemester.push({
            subject: "Any CMP SCI 3000+ Elective Course",
            course_number: "",
            course_name: "",
            credit: "3",
          });
          cmpElectiveCredits += 3;
          currentCredits += 3;
        }
        if (semCredits > currentCredits && semCredits - currentCredits <= 6) {
          let times = semCredits - currentCredits;
          for (let j = 0; j < times / 3; j++) {
            currentSemester.push({
              subject: "Any Elective or Minor Course",
              course_number: "",
              course_name: "",
              credit: "3",
            });
            currentCredits += 3;
          }
        }
      }
      addTotalCredits(currentCredits);
      while (
        (summerSemester && (i + 1) % 3 == 0
          ? summerCredits > currentCredits
          : semCredits > currentCredits) &&
        totalCredits < 120
      ) {
        currentSemester.push({
          subject: "Any Elective or Minor Course",
          course_number: "",
          course_name: "",
          credit: "3",
        });
        currentCredits += 3;
        addTotalCredits(3);
      }
      currentSemester.map((course) => {
        taken = [...taken, course];
      });
      setSemesters((oldValue) => [...oldValue, currentSemester]);
    }
  }, []);

  return (
    <Paper sx={{ mb: 5 }} elevation={2} className="degree-plan">
      {courseTaken.length > 0 ? (
        <>
          <h3>Courses already Taken</h3>
          <table>
            <thead>
              <tr>
                <td>Course</td>
                <td>Hours</td>
              </tr>
            </thead>
            <tbody>
              {courseTaken.map((course) => (
                <tr>
                  <td>
                    {course.subject} {course.course_number}
                  </td>
                  <td>{course.credit}</td>
                </tr>
              ))}
              <tr className="total">
                <td></td>
                <td>
                  <b>
                    {courseTaken.reduce(
                      (total, course) => total + parseInt(course.credit),
                      0
                    )}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </>
      ) : null}
      <div
        className={
          summerSemester ? "degree-plan-grid seasons-3" : "degree-plan-grid"
        }
      >
        {semesters.map((semester, count) =>
          semester.length ? (
            <div>
              <h3>
                <StringifyNumber n={parseInt(count) + 1} /> Semester
              </h3>
              <table>
                <thead>
                  <tr>
                    <td>{semSeasons[count % (summerSemester ? 3 : 2)]}</td>
                    <td>Hours</td>
                  </tr>
                </thead>
                <tbody>
                  {semester.map((course) => (
                    <tr>
                      <td>
                        {course.subject} {course.course_number}
                      </td>
                      <td>{course.credit}</td>
                    </tr>
                  ))}
                  <tr className="total">
                    <td></td>
                    <td>
                      <b>
                        {semester.reduce(
                          (total, course) => total + parseInt(course.credit),
                          0
                        )}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null
        )}
      </div>
      <div className="degree-plan-total">
        <h3>Total Credits - {totalCreditsPrint}</h3>
        <Button variant="contained" sx={{ mt: 1 }} onClick={() => print()}>
          Print
        </Button>
      </div>
      {/* Remaining Courses here */}
    </Paper>
  );
};

export default DegreePlan;
