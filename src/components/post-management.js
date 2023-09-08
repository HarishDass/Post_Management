/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchAppBar from "./navbar";
import { Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [alret, setAlert] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleChanges = (value) => {
    setPosts(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValue = () => {
    setOpen(true);
  };
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
  }));

  const Delete = (x) => {
    const FilterValue = posts.filter((x1) => x.id !== x1.id);
    setPosts(FilterValue);
    localStorage.setItem("POSTS", JSON.stringify(FilterValue));
    setAlert(false);
    setTimeout(() => {
      setAlert(true);
    }, 1000);
  };

  return (
    <div>
      <SearchAppBar setdata={handleChanges} value={posts} />
      {!alret ? (
        <Alert severity="success" id="alert-message">
          Deleted successFully
        </Alert>
      ) : (
        ""
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Comments
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            There isn't any thing in this
            "https://jsonplaceholder.typicode.com/posts/post_id/comments" API
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <div id="boxes">
        {posts.map((x, i) => {
          if (x !== undefined) {
            return (
              <Box key={i}>
                <Card variant="outlined" id="MUICards">
                  {
                    <React.Fragment>
                      <CardContent onClick={handleValue}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Quote of the day for userID:{x.userId}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {x.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          ID:{x.id}
                        </Typography>
                        <Typography variant="body2">
                          {x.body}
                          <br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => Delete(x)}
                          id="CardButton"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  }
                </Card>
              </Box>
            );
          }
        })}
      </div>
    </div>
  );
}

export default PostManagement;
