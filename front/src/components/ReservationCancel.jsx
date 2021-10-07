import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MyButton from "./common/Button";
import DatePicker2 from "./DatePicker";
import { useQuery, useMutation } from "react-query";
import { deleteReservation, getThemeTimeTable } from "./api";
import Loading from "./common/Loading";
import { getDate } from "./ReservationDo";

function ReservationCancel() {
  const [form, setForm] = useState({ date: new Date(), name: "", phone: "", theme: "", time: "" });
  const [phoneError, setPhoneError] = useState("");

  const { data: timeTableData, status: timeTableStatus } = useQuery(["timeTable", form.date], () =>
    getThemeTimeTable({ date: form.date })
  );

  const mutation = useMutation((deleteData) => deleteReservation(deleteData));

  const handleDelete = () => {
    if (!form.name || !form.phone || !form.theme || !form.time || phoneError) {
      alert("정보를 정확히 입력해주세요.");
      return;
    }
    mutation.mutate({ ...form, date: getDate(form.date) });
  };

  const onChange = (e) => {
    if (e.target.name === "phone") {
      var regexp = /^[0-9]*$/;

      if (!regexp.test(e.target.value)) {
        setPhoneError("숫자만 입력해주세요.");
      } else {
        setPhoneError("");
      }
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setStartDate = (date) => {
    setForm({ ...form, date: date });
  };

  if (timeTableStatus === "loading" || mutation.status === "loading") return <Loading />;
  return (
    <Grid container justifyContent={"center"}>
      {mutation.status === "idle" && (
        <Grid xs={12} md={12} container justifyContent={"center"}>
          <Grid md={5} xs={12}>
            <Box mb={5}>
              <Typography>예약날짜</Typography>
              <DatePicker2 startDate={form.date} setStartDate={setStartDate} />
            </Box>
          </Grid>
        </Grid>
      )}
      {mutation.status === "idle" && (
        <Grid xs={12} md={5}>
          <Stack spacing={6}>
            <TextField
              id="standard-basic"
              label="이름"
              variant="standard"
              name={"name"}
              value={form.name}
              onChange={onChange}
              style={{ width: "100%" }}
            />
            <TextField
              error={phoneError ? true : false}
              id="standard-basic"
              label="연락처"
              variant="standard"
              name={"phone"}
              value={form.phone}
              onChange={onChange}
              helperText={phoneError}
              style={{ width: "100%" }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="테마"
              value={form.theme}
              onChange={onChange}
              name={"theme"}
              // helperText="예약할 인원을 선택해주세요."
              style={{ width: "100%" }}
            >
              {timeTableData.map((data) => (
                <MenuItem key={data.name} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="시간"
              value={form.time}
              onChange={onChange}
              name={"time"}
              // helperText="예약할 인원을 선택해주세요."
              style={{ width: "100%" }}
            >
              {form.theme &&
                timeTableData
                  .find((data) => data.name === form.theme)
                  .time.map((data) => (
                    <MenuItem key={data.time} value={data.time}>
                      {data.time}
                    </MenuItem>
                  ))}
            </TextField>
          </Stack>
          <Box mt={10}>
            <Grid container justifyContent={"center"}>
              <MyButton onClick={() => handleDelete()}>예약 취소</MyButton>
            </Grid>
          </Box>
        </Grid>
      )}
      {mutation.status === "success" && (
        <Grid>
          <Stack spacing={3}>
            <Typography variant={"h3"}>예약 취소가 완료되었습니다.</Typography>
            <Typography variant={"h5"}>이용해주셔서 감사합니다.</Typography>
          </Stack>
        </Grid>
      )}
      {mutation.status === "error" && (
        <Grid>
          <Stack spacing={3}>
            <Typography variant={"h3"}>예약 취소에 실패하였습니다.</Typography>
            <Typography variant={"h5"}>다시 한번 시도해주세요.</Typography>
            <Typography variant={"h5"}>
              재시도 실패 시, 전화로 연락주시면 취소 도와드리겠습니다.
            </Typography>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default ReservationCancel;
