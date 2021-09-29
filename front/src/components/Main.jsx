import { styled } from "@mui/system";
import React from "react";

function Main() {
  return (
    <StyledBackGround>
      <img src={"/main.jpg"} alt={"mainImg"} />
    </StyledBackGround>
  );
}

const StyledBackGround = styled("div")({
  // backgroundSize: "cover",
  // backgroundImage: "url(/main.jpg)",
  // height: "50vh",
  "&>img": {
    width: "100%",
    height: "100%",
  },
});

export default Main;
