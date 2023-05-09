import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const Requirements = () => {
  const cs_rows = [
    { code: "CMP SCI 1000", name: "Computer Science Experiences", credit: "1" },
    { code: "CMP SCI 1250", name: "Introduction to Computing", credit: "3" },
    {
      code: "CMP SCI 2250",
      name: "Programming and Data Structures",
      credit: "3",
    },
    { code: "CMP SCI 2261", name: "Object-Oriented Programming", credit: "3" },
    {
      code: "CMP SCI 2700",
      name: "Computer Organization and Architecture",
      credit: "3",
    },
    {
      code: "CMP SCI 2750",
      name: "Linux Environment and Programming",
      credit: "3",
    },
    { code: "CMP SCI 3010", name: "Web Full Stack Development", credit: "3" },
    {
      code: "CMP SCI 3130",
      name: "Design and Analysis of Algorithms",
      credit: "3",
    },
    { code: "CMP SCI 4250", name: "Programming Languages", credit: "3" },
    { code: "CMP SCI 4280", name: "Program Translation Project", credit: "3" },
    {
      code: "CMP SCI 4500",
      name: "Introduction to the Software Profession",
      credit: "3",
    },
    { code: "CMP SCI 4760", name: "Operating Systems", credit: "3" },
  ];

  const math_rows = [
    {
      code: "MATH 1320",
      name: "Introduction to Probability and Statistics",
      credit: "3",
    },
    {
      code: "MATH 1800",
      name: "Analytic Geometry and Calculus I",
      credit: "5",
    },
    {
      code: "MATH 1900",
      name: "Analytic Geometry and Calculus II",
      credit: "5",
    },
    { code: "MATH 2450", name: "Elementary Linear Algebra", credit: "3" },
    { code: "MATH 3000", name: "Discrete Structures", credit: "3" },
  ];

  return (
    <>
      <Paper elevation={1} sx={{ px: 4, py: 3, mb: 2 }}>
        <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 600 }}>
          General Education Requirements
        </Typography>
        <Box>
          <p>
            All department majors must satisfy the university and appropriate
            school or college general education requirements. All mathematics
            courses may be used to meet the university’s general education
            breadth of study requirement in natural sciences and mathematics.
          </p>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ px: 4, py: 3, mb: 2 }}>
        <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Satisfactory/Unsatisfactory Restrictions
        </Typography>
        <Box>
          <p>
            All department majors may not take mathematical and computer
            sciences courses on a satisfactory/unsatisfactory basis. Students
            considering graduate study should consult with their advisers about
            taking work on a satisfactory/unsatisfactory basis.
          </p>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ px: 4, py: 3, mb: 2 }}>
        <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Degree Requirements
        </Typography>
        <Box sx={{ mb: 2 }}>
          <p>
            All courses of the department presented to meet the degree
            requirements must be completed with a grade of C- or better. At
            least four courses numbered 3000 or above must be taken in
            residence. Students must have a 2.0 grade point average in the
            computer science courses completed.
          </p>
        </Box>
        <Box sx={{ mb: 2 }}>
          <p>
            A minimum grade of C- is required to meet the prerequisite
            requirement for any course except with permission of the department.
          </p>
        </Box>
        <Box sx={{ mb: 2 }}>
          <p>
            Students who are ready to begin their program with CMP SCI 2250
            Programming and Data Structures, will be granted credit for CMP SCI
            1250, Introduction to Computing, once they complete CMP SCI 2250
            with a grade of C- or better.
          </p>
        </Box>
        <Box>
          <p>
            Note: Courses that are prerequisites for higher-level courses may
            not be taken for credit or quality points if the higher-level course
            has been satisfactorily completed.
          </p>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ px: 4, py: 3, mb: 2 }}>
        <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Degree Requirements in Computer Science
        </Typography>
        <Box sx={{ mb: 2 }}>
          <p>
            Candidates for the B. S. Computer Science degree must complete the
            following work:
          </p>
        </Box>
        <Box sx={{ mb: 2, fontWeight: 700 }}>
          <p>1) Computer Science Core</p>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {cs_rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.code}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.credit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mb: 2, fontWeight: 700 }}>
          <p>2) Computer Science Electives</p>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Select five more elective computer science courses, numbered
                  above 3000.
                </TableCell>
                <TableCell align="right">15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mb: 2, fontWeight: 700 }}>
          <p>3) Mathematics and Statistics</p>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {math_rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.code}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.credit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mb: 2, fontWeight: 700 }}>
          <p>4) Additional Skills</p>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  ENGL 3130
                </TableCell>
                <TableCell component="th" scope="row">
                  Technical Writing
                </TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                  Total Hours
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 700 }}
                ></TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  71
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <p>
            For more information <a href="https://www.umsl.edu/degrees/bachelors/computer-science.html"> click here</a>
          </p>
        </Box>
      </Paper>
    </>
  );
};

export default Requirements;
