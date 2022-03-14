import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { FormControlLabel, Grid, MenuItem, Radio, RadioGroup } from "@material-ui/core";
import { Divider, FormControl, FormLabel, Stack, Typography } from "@mui/material";
import MyButton from "../common/Button";
import { useMutation } from "react-query";
import { postReservation } from "../api";
import Loading from "../common/Loading";

function ReservationInput({
  setActiveStep,
  selectedTheme,
  selectedTime,
  selectedDate,
  price,
  minCount,
  maxCount,
}) {
  const initialData = {
    name: "",
    phone: "",
    count: "",
  };
  const [data, setData] = useState(initialData);
  const [isAgree, setIsAgree] = useState("no");
  const [phoneError, setPhoneError] = useState("");
  const reservationDate = selectedDate;

  const onChange = (e) => {
    if (e.target.name === "phone") {
      var regexp = /^[0-9]*$/;

      if (!regexp.test(e.target.value)) {
        setPhoneError("숫자만 입력해주세요.");
      } else {
        setPhoneError("");
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const mutation = useMutation((postData) => {
    return postReservation(postData);
  });

  useEffect(() => {
    if (mutation.status === "success") {
      setActiveStep((activeStep) => activeStep + 2);
    }
  }, [mutation.status, setActiveStep]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleComplete = () => {
    if (!data.name) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!data.phone) {
      alert("연락처를 입력해주세요.");
      return;
    }

    if (phoneError) {
      alert("연락처는 숫자만 입력해주세요.");
      return;
    }

    if (isAgree === "no") {
      alert("주의 사항에 동의 시 예약이 가능합니다.");
      return;
    }

    if (!data.count) {
      alert("인원을 선택해주세요.");
      return;
    }

    mutation.mutate({
      date: reservationDate,
      theme: selectedTheme,
      time: selectedTime,
      name: data.name,
      phone: data.phone,
      count: data.count,
      price: Number(price[data.count - minCount]) * data.count,
    });
  };

  const countData = [...Array(Number(maxCount) + 1)]
    .map((n, i) => i)
    .slice(Number(minCount), Number(maxCount) + 1);

  //price,
  if (mutation.status === "loading") return <Loading />;
  return (
    <div>
      <Grid container justifyContent={"center"}>
        <Grid xs={12} md={6}>
          <Stack spacing={5}>
            <TextField
              id="standard-basic"
              label="예약일"
              variant="filled"
              color={"success"}
              // name={"name"}
              value={selectedDate}
              style={{ width: "100%" }}
            />
            <TextField
              id="standard-basic"
              label="테마명"
              variant="filled"
              color={"success"}
              // disabled
              // name={"name"}
              value={selectedTheme}
              style={{ width: "100%" }}
            />
            <TextField
              id="standard-basic"
              label="예약 시간"
              variant="filled"
              color={"success"}
              // disabled
              // name={"name"}
              value={selectedTime}
              style={{ width: "100%" }}
            />
            <TextField
              id="standard-basic"
              label="이름"
              variant="standard"
              name={"name"}
              value={data.name}
              onChange={onChange}
              style={{ width: "100%" }}
            />
            <TextField
              error={phoneError ? true : false}
              id="standard-basic"
              label="연락처"
              variant="standard"
              name={"phone"}
              value={data.phone}
              onChange={onChange}
              helperText={phoneError}
              style={{ width: "100%" }}
            />

            <TextField
              id="outlined-select-currency"
              select
              label="인원"
              value={data.count}
              onChange={onChange}
              name={"count"}
              // helperText="예약할 인원을 선택해주세요."
              style={{ width: "100%" }}
            >
              {countData.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}명
                </MenuItem>
              ))}
            </TextField>

            <Divider />
            <Typography variant={"h5"}>{`가격:${
              data.count ? Number(price[data.count - minCount]) * data.count : 0
            }원`}</Typography>
          </Stack>
          <Box border={1} padding={2} mb={10} mt={3}>
            <Typography component={"p"} variant={"h6"} fontWeight={"bold"} marginBottom={3}>
              [예약 시 주의 사항]
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
            >
              {"1. 예약 후 다음 날 오전 10시 전까지 입금 부탁드립니다. "}
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
            >
              {
                "시간 내 미입금 시 예약이 자동 취소될 수 있습니다. \n입금명과 예약자명이 다를 시 전화 부탁드립니다. \n(카드결제, 현금영수증을 원하시는 분은 방문 시에 말씀해주세요.)"
              }
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
              sx={{ marginTop: 1 }}
            >
              {"입금 계좌: 기업은행/주재빈 123-170741-01-019"}
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
              sx={{ marginTop: 1 }}
            >
              {"2. 취소 및 환불은 방문 전일까지 가능합니다. \n(방문 전날 확인 전화를 드립니다.)"}
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
              sx={{ marginTop: 1 }}
            >
              {
                "3. 반드시 테마 시작 10분전 도착해주세요. \n지각 시 플레이 시간이 감소될 수 있습니다."
              }
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
              sx={{ marginTop: 1 }}
            >
              {"4. 음주 상태 시 참여가 제한 됩니다."}
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
              sx={{ marginTop: 1 }}
            >
              {
                "5. 게임에 자극적인 내용이 포함되거나 일부 공간이 불쾌감을 줄 수 있으므로 임산부, 노약자, 심약자(폐쇄공포증 등), 미취학 아동의 출입을 자제해주세요. 참여를 원할 시 반드시 방문전 문의 부탁드립니다."
              }
            </Typography>

            <Typography
              component={"pre"}
              variant={"body2"}
              fontWeight={"bold"}
              color={"black"}
              whiteSpace={"pre-wrap"}
              sx={{ marginTop: 1 }}
            >
              {"6. 주차공간이 따로 마련되어 있지 않아 근처 유로 주차장을 이용해주셔야 합니다."}
            </Typography>

            <Box sx={{ marginTop: 3 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  위 사항을 지키지 않을 시 발생한 사항에 대해 코드네임은 모든 책임을 지지 않습니다.
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  value={isAgree}
                  onChange={(event) => {
                    setIsAgree(event.target.value);
                  }}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="예" />
                  <FormControlLabel value="no" control={<Radio />} label="아니오" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box mb={10}>
            <Grid container justifyContent={"center"}>
              <MyButton onClick={() => handleComplete()}>예약 완료</MyButton>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReservationInput;
