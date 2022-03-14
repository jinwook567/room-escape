import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../common/Modal";
import { Grid } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import ThemeDetail from "./ThemeDetail";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ThemeCard({ data }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia className={classes.media} image={data.image} title="theme image" />

          <CardContent>
            <Typography
              variant="h6"
              // color="textSecondary"
              component="p"
              style={{ fontWeight: "bold", marginRight: 3 }}
            >
              {data.name}
            </Typography>
            <Grid container>
              <Grid container>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: "bold", marginRight: 3 }}
                >
                  장르:
                </Typography>

                <Typography variant="body1" color="textSecondary" component="p">
                  {data.genre}
                </Typography>
              </Grid>
              <Grid container>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: "bold", marginRight: 3 }}
                >
                  플레이:
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  {data.play}
                </Typography>
              </Grid>
              <Grid container alignItems={"center"}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  style={{ fontWeight: "bold", marginRight: 3 }}
                >
                  난이도:
                </Typography>
                <Rating defaultValue={data.level} readOnly size={"small"}></Rating>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={open} setOpen={setOpen}>
        <ThemeDetail data={data} />
      </Modal>
    </>
  );
}

// mouse over Card info
//

export default ThemeCard;
