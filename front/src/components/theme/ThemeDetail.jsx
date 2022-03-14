import { Divider, Grid, Typography } from "@material-ui/core";
import { Rating, Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";
import MyButton from "../common/Button";

function ThemeDetail({ data }) {
  const history = useHistory();

  const StyledGrid = styled(Grid)(({ theme }) => ({
    justifyContent: "flex-end",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "flex-start",
    },
  }));

  const StyledDivider = styled(Divider)({
    height: "5px",
    color: "black",
    marginTop: "20px",
    marginBottom: "30px",
    backgroundColor: "black",
    borderRadius: "20px",
  });

  const StyledTypoGraphy = styled(Typography)({
    whiteSpace: "pre-wrap",
  });

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography variant={"h4"}>{data.name}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <StyledGrid container>
            <Grid item />
            <Stack direction={{ xs: "column", md: "row" }} spacing={{ md: 2, xs: 0.2 }}>
              <Box sx={{ display: "flex" }}>
                <Box mr={1}>
                  <Typography variant={"h6"}>장르 </Typography>
                </Box>
                <Typography variant={"h6"}>{data.genre}</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box mr={1}>
                  <Typography variant={"h6"}>플레이 </Typography>
                </Box>
                <Typography variant={"h6"}>{data.play}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box mr={1}>
                  <Typography variant={"h6"}>난이도 </Typography>
                </Box>
                <Rating defaultValue={data.level} readOnly size={"small"}></Rating>
              </Box>
            </Stack>
          </StyledGrid>
        </Grid>
      </Grid>
      <StyledDivider light />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img alt={"theme"} src={data.image} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box flexWrap={"wrap"}>
            <StyledTypoGraphy variant={"body1"} component={"pre"} whiteSpace={"pre-wrap"}>
              {data.description}
            </StyledTypoGraphy>
          </Box>
        </Grid>
      </Grid>

      <Grid container justify={"center"}>
        <Box marginTop={5}>
          <MyButton size={"large"} onClick={() => history.push("/reservation")}>
            예약하기
          </MyButton>
        </Box>
      </Grid>
    </div>
  );
}

export default ThemeDetail;
