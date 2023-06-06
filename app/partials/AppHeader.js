"use client";
import { AppBar, Toolbar, Box, Button, Container } from "@mui/material";
import React from "react";

export default function AppHeader() {
  return (
    <div>
      <Box sx={{ m: 5, p: 10, border: "1px solid grey", height: "50px" }}>
        <span>Target Final Deploy: June 10, 2023</span>
      </Box>
    </div>
  );
}
