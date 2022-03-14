import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ReservationDo from "./ReservationDo";
import { Box } from "@mui/system";
import { StyledContent } from "../../App";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ReservationCancel from "./ReservationCancel";
import { use100vh } from "react-div-100vh";

function Reservation() {
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const height = use100vh();

  return (
    <StyledContent height={height}>
      <Grid container>
        <Grid item xs={12}>
          <TabContext value={value}>
            <Box sx={{ justifyContent: "center", marginBottom: 8 }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="예약" value={1} />
                <Tab label="예약 취소" value={2} />
              </TabList>
            </Box>

            <Box mt={3}>
              {Number(value) === 1 && <ReservationDo />}
              {Number(value) === 2 && <ReservationCancel />}
            </Box>
          </TabContext>

          {/* <ReservationInput /> */}
        </Grid>
      </Grid>
    </StyledContent>
  );
}

export default Reservation;
