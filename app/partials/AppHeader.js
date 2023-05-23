"use client";
import { AppBar, Toolbar, Box, Button, Container } from "@mui/material";
import React from "react";

export default function AppHeader() {
  return (
    <div>
      <Box sx={{ m: 5, p: 10, border: "1px solid grey", height: "100px" }}>
        <Button
          variant="outlined"
          sx={{ color: "black", backgroundColor: "blanchedalmond" }}
        >
          Save working!
        </Button>
      </Box>
    </div>
  );
}
