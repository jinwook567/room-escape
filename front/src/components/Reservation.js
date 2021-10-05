import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DatePicker2 from "./DatePicker";
import ReservationDo from "./ReservationDo";
import ReservationInput from "./ReservationInput";
import { Box } from "@mui/system";
import { StyledContent } from "../App";

function Reservation() {
  return (
    <StyledContent>
      <Grid container>
        <Grid item xs={12}>
          {/* <Typography variant="h4" component={"h1"} sx={{ m: 2 }}>
          예약
        </Typography> */}

          <Box mt={3}>
            <ReservationDo />
          </Box>

          {/* <ReservationInput /> */}
        </Grid>
      </Grid>
    </StyledContent>
  );
}

export default Reservation;
