import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Paper elevation={1} sx={{ px: 4, py: 3 }}>
        <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Degree Planner Tool
        </Typography>
        <Box sx={{ mb: 3 }}>
          <p>
            The B.S. in Computer Science combines the depth and breadth of traditional computer science studies with practical exposure to a wide variety of tools and technologies. This program is designed for those interested in software and computer systems. It provides students a solid foundation in computing and mathematics, and facilitates specializations offered through electives and certificates such as Artificial Intelligence, Cybersecurity, Data Science, Mobile Apps and Computing, and Internet and Web. In addition, students develop practical skills for working in groups and technical reading and writing.  Students completing this degree have also gained professional and ethical perspectives and are well prepared for a challenging career or further graduate studies in Computer Science. The entire program can be completed in the evening, and most courses can also be completed online.
          </p>
        </Box>
        <Box sx={{ mb: 3 }}>
          <p>
            For any feedback and Bug report write us on <a href= "mailto: rprwn@umsystem.edu" >rprwn@umsystem.edu</a>
            </p>
        </Box>
        <Button component={Link} to="/requirements" variant="contained">
          Requirements
        </Button>
        <br />
        <br/>
        <Button href="/planner" variant="contained">
          Get Started
        </Button>
      </Paper>
    </>
  );
};

export default Home;
