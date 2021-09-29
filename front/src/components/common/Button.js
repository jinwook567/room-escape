import { styled, Button } from "@material-ui/core";

import React from "react";

function MyButton({ size, children, onClick, selected, disabled }) {
  //size: small, medium, large
  const StyledButton = styled(Button)(({ theme }) => ({
    borderColor: disabled ? "lightGray" : "black",
    border: "3px solid",
    width: "200px",
    borderRadius: "50px",
    fontSize: "11pt",
    backgroundColor: selected ? "black" : "transparent",
    color: selected ? "white" : "black",
    [`&:hover`]: {
      color: selected ? "white" : "black",
      backgroundColor: selected ? "black" : "white",
    },
    [theme.breakpoints.up("lg")]: {
      width: "300px",
      fontSize: "15pt",
    },
  }));
  return (
    <StyledButton
      variant={"outline"}
      size={size}
      color={"black"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default MyButton;
