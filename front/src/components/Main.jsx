import { Grid } from "@material-ui/core";
import { styled } from "@mui/system";
import React from "react";
import { use100vh } from "react-div-100vh";
import { StyledContent } from "../App";
import { DesktopGrid, MobileGrid } from "./common/Grid";

function Main() {
  const height = use100vh();
  return (
    <StyledContent container height={height}>
      <StyledBackGround container>
        <StyledDesktop container>
          <img src={"/main_pc.png"} alt={"mainImg"} />
        </StyledDesktop>
        <StyledMobile container>
          <img src={"/main_mobile.png"} alt={"mainImg"} />
        </StyledMobile>
      </StyledBackGround>
    </StyledContent>
  );
}

const StyledDesktop = styled(DesktopGrid)({
  "&>img": {
    width: "90%",
    height: "100%",
  },
  justifyContent: "center",
  alignItems: "center",
});

const StyledMobile = styled(MobileGrid)({
  "&>img": {
    width: "100%",
    height: "100%",
  },
  justifyContent: "center",
  alignItems: "center",
});

const StyledBackGround = styled(Grid)({
  // backgroundSize: "cover",
  // backgroundImage: "url(/main.jpg)",
  // height: "50vh",

  height: "100%",

  // "&>img": {
  //   width: "100%",
  //   height: "100%",
  // },
});

export default Main;
