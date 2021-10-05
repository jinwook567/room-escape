import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Divider, Grid, styled, Typography } from "@material-ui/core";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import DatePicker2 from "./DatePicker";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import { getTheme, getThemeTimeTable } from "./api";
import Loading from "./common/Loading";
import MyButton from "./common/Button";
import Stack from "@mui/material/Stack";
import ReservationInput from "./ReservationInput";
import ReservationTime from "./ReservationTime";
import ReservationComplte from "./ReservationComplte";

export const getDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  return `${year}-${month}-${day}`;
};

function ReservationDo() {
  const steps = ["날짜/테마 선택", "예약정보 입력", "예약 완료"];
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const { data: timeTableData, status: timeTableStatus } = useQuery(["timeTable", startDate], () =>
    getThemeTimeTable({ date: startDate })
  );

  const listRef = useRef();

  useEffect(() => {
    setSelectedTheme("");
    setSelectedTime("");
  }, [startDate]);

  const handleTheme = (themeName) => {
    setSelectedTheme(themeName);
    setSelectedTime("");
  };

  const handleTime = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    //validation
    if (!selectedTheme || !selectedTime) {
      alert("시간과 테마를 선택해주세요.");
      return;
    }
    setActiveStep((pre) => pre + 1);
  };

  const Item = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "transparent",
  }));

  const StyledGrid = styled(Grid)({
    border: "1px solid",
    borderColor: "black",
  });

  const StyledTimeGrid = styled(Grid)({
    border: "1px solid",
    borderColor: "black",
    // overflow: "scroll",
    // minHeight: "400px",
    // maxHeight: "500px",
  });

  if (timeTableStatus === "loading") return <Loading />;

  return (
    <div>
      <Grid container justifyContent={"center"} enableResetScrollToCoords={false}>
        <Grid item xs={12} md={9}>
          <Box mb={6}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((label, i) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </Grid>

        {activeStep === 0 && (
          <StyledGrid container spacing={2}>
            <StyledGrid item xs={12} md={4} sm={12}>
              <Item>
                <Box mb={2}>
                  <Typography variant={"h6"}>날짜</Typography>
                  {/* <Divider /> */}
                </Box>
                <DatePicker2 startDate={startDate} setStartDate={setStartDate} />
              </Item>
            </StyledGrid>

            <StyledGrid item xs={12} md={4}>
              <Item>
                <Box mb={2}>
                  <Typography variant={"h6"}>테마</Typography>
                  {/* <Divider /> */}
                </Box>
                <Stack spacing={2}>
                  {timeTableData.map((data) => {
                    return (
                      <Item key={data.name}>
                        <MyButton
                          selected={selectedTheme === data.name}
                          onClick={() => handleTheme(data.name)}
                        >
                          {data.name}
                        </MyButton>
                      </Item>
                    );
                  })}
                </Stack>
              </Item>
            </StyledGrid>

            <StyledTimeGrid item xs={12} md={4} ref={listRef}>
              <Item>
                <Box mb={2}>
                  <Typography variant={"h6"}>시간</Typography>
                  {/* <Divider /> */}
                </Box>
                <Stack spacing={1}>
                  <ReservationTime
                    selectedTheme={selectedTheme}
                    selectedTime={selectedTime}
                    handleTime={handleTime}
                    timeTableData={timeTableData}
                  />
                  {/* {selectedTheme &&
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
                      })} */}
                </Stack>
              </Item>
            </StyledTimeGrid>
          </StyledGrid>
        )}

        {activeStep === 0 && (
          <Box mt={10}>
            <MyButton onClick={() => handleNext()}>예약하기</MyButton>
          </Box>
        )}

        {activeStep === 1 && (
          <Grid xs={12} md={12}>
            <Box mt={3}>
              <ReservationInput
                selectedDate={getDate(startDate)}
                selectedTheme={selectedTheme}
                selectedTime={selectedTime}
                setActiveStep={setActiveStep}
                price={timeTableData.find((data) => data.name === selectedTheme).price}
                minCount={timeTableData.find((data) => data.name === selectedTheme).minCount}
                maxCount={timeTableData.find((data) => data.name === selectedTheme).maxCount}
              />
            </Box>
          </Grid>
        )}
        {activeStep === 3 && (
          <Box sx={{ mt: 2 }}>
            <ReservationComplte />
          </Box>
        )}
      </Grid>
    </div>
  );
}

export default ReservationDo;
