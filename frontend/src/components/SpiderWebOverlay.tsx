import React from "react";
import { Box } from "@mui/material";
import { useHalloween } from "../contexts/HalloweenContext";

const SpiderWebOverlay: React.FC = () => {
  const { isHalloweenMode } = useHalloween();
  
  if (!isHalloweenMode) return null;
  
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
