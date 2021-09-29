import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider, styled } from "@material-ui/core";

function Footer() {
  return (
    <div>
      <StyledDivider />
      <Grid container spacing={3} justify={"center"}>
        <Grid item>
          <Typography variant="h7">상호:코드네임</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h7">주소:경기 부천시 부일로 459번길 40, 6층</Typography>
        </Grid>
        {/* <Grid item>
          <Typography variant="h7">Tel:</Typography>
        </Grid> */}
      </Grid>
      <Grid container spacing={3} justify={"center"}>
        <Grid item>
          <Typography variant="h7">Tel:032-719-8771</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h7">E-mail:codename921128@gmail.com</Typography>
        </Grid>
        {/* <Grid item>
          <Typography variant="h7">상호:블라블라블라</Typography>
        </Grid> */}
      </Grid>
    </div>
  );
}

const StyledDivider = styled(Divider)({
  height: "5px",
  color: "black",
  marginTop: "50px",
  marginBottom: "30px",
  backgroundColor: "black",
  borderRadius: "20px",
});

export default Footer;
