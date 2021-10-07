import React from "react";
import Grid from "@material-ui/core/Grid";
import ThemeCard from "./ThemeCard";
import { Box, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { getTheme } from "./api";
import Loading from "./common/Loading";
import { StyledContent } from "../App";
import { use100vh } from "react-div-100vh";

function Theme() {
  const { data: themeData, status } = useQuery("theme", getTheme);
  const height = use100vh();
  if (status === "loading") return <Loading />;
  if (status === "error") return <div>error..</div>;
  return (
    <StyledContent height={height}>
      <div>
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" component={"h1"} sx={{ m: 2 }}>
            코드네임의 테마를 지금 만나보세요.
          </Typography>
        </Box>

        <Grid spacing={3} container columns={{ xs: 6, md: 3 }}>
          {themeData.map((data, i) => (
            <Grid item xs={6} md={3} key={i}>
              <ThemeCard data={data} />
            </Grid>
          ))}
        </Grid>
      </div>
    </StyledContent>
  );
}

//데스크탑 4개씩, 모바일 2개씩

export default Theme;
