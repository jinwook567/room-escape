import React from "react";
import { Link as MaterialLink } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function Link({ linkUrl, linkName }) {
  return (
    <RouterLink to={linkUrl} style={{ textDecoration: "none" }}>
      <MaterialLink color={"textPrimary"} underline={"hover"}>
        <Typography variant="h6">{linkName}</Typography>
      </MaterialLink>
    </RouterLink>
  );
}

export default Link;
