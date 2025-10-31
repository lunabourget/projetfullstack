import React from "react";
import { Box } from "@mui/material";

const SpiderWebOverlay: React.FC = () => {
  return (
    <Box
      component="img"
      src="/toile_araignee_bouhouhouhou.png"
      alt=""
      sx={{
        position: "fixed",
        bottom: -250,
        left: -250,
        width: { xs: 600, sm: 600, md: 600, lg: 550 },
        height: "auto",
        objectFit: "none",
        objectPosition: "right top",
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
};

export default SpiderWebOverlay;
