/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { PostService } from "../services/service";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({ setdata, value }) {
  const [data, setData] = React.useState([]);
  const [error] = React.useState([]);
  const [alert, setAlert] = React.useState([]);
  const nextData = localStorage.getItem("SEARCH_VALUE");
  const nextStore = localStorage.getItem("POSTS");
  const newData = localStorage.getItem("success");
  const Reload = () => {
    localStorage.setItem("SEARCH_VALUE", "");
    localStorage.setItem("POSTS", JSON.stringify([]));
    window.location.reload();
    localStorage.setItem("success", "something");
  };

  React.useEffect(() => {
    PostService().then((res) => {
      if (
        (nextData === "" && nextStore === JSON.stringify([]) && newData) ||
        localStorage.length === 0
      ) {
        localStorage.setItem("POSTS", JSON.stringify(res.data));
        setdata(res.data);
      }
      setAlert(JSON.parse(localStorage.getItem("POSTS")));
    });
  }, []);
  React.useEffect(() => {
    setdata(JSON.parse(nextStore));
    setData(JSON.stringify(nextData));
    setTimeout(() => {
      error.push("Oops!!");
      error.push("There isn't any data related to what you have searched for.");
    }, 2000);
  }, []);
  const change = (e) => {
    localStorage.setItem("SEARCH_VALUE", e.target.value);
    if (e.target.value === "") {
      localStorage.removeItem("success");
    }
    const changeVal = alert.filter((filteredValue) => {
      if (e.target.value === "") {
        return filteredValue;
      } else {
        return (
          filteredValue.body.startsWith(e.target.value) ||
          filteredValue.title.startsWith(e.target.value) ||
          filteredValue.id === Number(e.target.value)
        );
      }
    });
    localStorage.setItem("POSTS", JSON.stringify(changeVal));
    const localdata = localStorage.getItem("POSTS");
    setdata(JSON.parse(localdata));
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} id="navbarBox">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              POST-MANAGEMENT
            </Typography>
            <Button size="small" onClick={Reload} style={{ color: "white" }}>
              Reload
            </Button>
            <Search onChange={(e) => change(e)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={
                  JSON.stringify(data).length === 0
                    ? "Search.."
                    : JSON.stringify(data).slice(3, -3)
                }
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      {value.length === 0 ? (
        <div id="errorMessage">
          <h1>{error[0]}</h1>
          <h3>{error[1]}</h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
