import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import PieChartIcon from "@mui/icons-material/PieChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = React.useState(location.pathname);

  React.useEffect(() => {
    setTab(location.pathname);
  }, [location.pathname]);

  // --- Desktop version ---
  if (!isMobile) {
    return (
      <AppBar position="static" color="default" sx={{ background: "#333" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              BudJet !
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => navigate("/")} color="inherit" sx={{ color: tab === "/" ? "#f54e00ff" : "#fff" }}>
              <HomeIcon />
            </IconButton>
            <Button
              color="inherit"
              sx={{ color: tab === "/expenses" ? "#9a00b9ff" : "#fff", fontWeight: tab === "/expenses" ? "bold" : "normal" }}
              onClick={() => navigate("/expenses")}
            >
              Dépenses
            </Button>
            <Button
              color="inherit"
              sx={{ color: tab === "/budgets" ? "#690000ff" : "#fff", fontWeight: tab === "/budgets" ? "bold" : "normal" }}
              onClick={() => navigate("/budgets")}
            >
              Budgets
            </Button>
            <Button
              color="inherit"
              sx={{ color: tab === "/cgu" ? "#f54e00ff" : "#fff", fontWeight: tab === "/cgu" ? "bold" : "normal" }}
              onClick={() => navigate("/cgu")}
            >
              Catégories
            </Button>

            <IconButton color="inherit">
              <AccountCircleIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

 // --- Mobile version ---
return (
  <>
    <AppBar position="fixed" color="default" sx={{ background: "#333" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          BudJet !
        </Typography>

        <IconButton color="inherit">
          <AccountCircleIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
    </AppBar>

    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={tab}
        onChange={(_, newValue) => {
          setTab(newValue);
          navigate(newValue);
        }}
        sx={{
          backgroundColor: "#333",
        }}
      >
        <BottomNavigationAction
          label="Accueil"
          value="/"
          icon={<HomeIcon />}
          sx={{
            color: "#fff",
            backgroundColor: tab === "/" ? "#f54e00ff" : "transparent",
            borderRadius: "10px",
            mx: 0.5,
            "&.Mui-selected": {
              color: "#fff",
            },
          }}
        />

        <BottomNavigationAction
          label="Dépenses"
          value="/expenses"
          icon={<PaidIcon />}
          sx={{
            color: "#fff",
            backgroundColor: tab === "/expenses" ? "#9a00b9ff" : "transparent",
            borderRadius: "10px",
            mx: 0.5,
            "&.Mui-selected": {
              color: "#fff",
            },
          }}
        />

        <BottomNavigationAction
          label="Budgets"
          value="/budgets"
          icon={<PieChartIcon />}
          sx={{
            color: "#fff",
            backgroundColor: tab === "/budgets" ? "#690000ff" : "transparent",
            borderRadius: "10px",
            mx: 0.5,
            "&.Mui-selected": {
              color: "#fff",
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  </>
);
};

export default Header;
