import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Summary = () => {
  return (
    <Paper elevation={1} sx={{ px: 4, py: 3 }}>
      <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
        Project Summary
      </Typography>
      <Box sx={{ mb: 2 }}>
        <p>This tool is designed to help new and existing students plan their bachelor's degree program more effectively. It allows students to easily plan their course schedule, display which courses are available in each semester, and identify any prerequisites required for each course. The tool also provides personalized recommendations based on the student's degree requirements, interests, and schedule preferences. By regularly updating the tool and seeking feedback from users, it provides students with an accurate and up-to-date tool to make planning their degree program a more streamlined and successful process.</p>
      </Box>
      
    </Paper>
  );
};

export default Summary;
