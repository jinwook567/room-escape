import ReactLoading from "react-loading";

import React from "react";
import { Grid } from "@material-ui/core";

function Loading() {
  return (
    <Grid container justify={"center"} alignItems={"center"} style={{ minHeight: "70vh" }}>
      <ReactLoading type={"bars"} color={"#191919"} width={150} height={150} />
    </Grid>
  );
}

export default Loading;
