import { styled } from "@material-ui/core";
import React from "react";

import MyButton from "./common/Button";

function ReservationTime({ selectedTheme, timeTableData, handleTime, selectedTime }) {
  return (
    <>
      {selectedTheme &&
        timeTableData
          .find((data) => data.name === selectedTheme)
          .time.map((data) => {
            return (
              <Item>
                <MyButton
                  selected={data.time === selectedTime}
                  disabled={data.booked}
                  onClick={() => handleTime(data.time)}
                >
                  {data.time}
                </MyButton>
              </Item>
            );
          })}
    </>
  );
}

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "transparent",
}));

export default React.memo(ReservationTime);
