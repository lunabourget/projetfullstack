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
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import PieChartIcon from "@mui/icons-material/PieChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/auth.service";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = React.useState(location.pathname);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    handleMenuClose();
    onLogout();
    navigate("/");
  };

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
              sx={{ color: tab === "/depenses" ? "#9a00b9ff" : "#fff", fontWeight: tab === "/depenses" ? "bold" : "normal" }}
              onClick={() => navigate("/depenses")}
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
              sx={{ color: tab === "/categories" ? "#f54e00ff" : "#fff", fontWeight: tab === "/categories" ? "bold" : "normal" }}
              onClick={() => navigate("/categories")}
            >
              Catégories
            </Button>

            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Se déconnecter
              </MenuItem>
            </Menu>
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

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon sx={{ color: "#fff" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            Se déconnecter
          </MenuItem>
        </Menu>
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
