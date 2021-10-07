import { Typography, Box, Grid } from "@mui/material";
import React from "react";

function ReservationComplte() {
  return (
    <div>
      <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>
        <Typography variant={"h3"} component={"p"} fontWeight={"bold"}>
          예약해주셔서 감사합니다.
        </Typography>

        <Typography variant={"h5"} component={"p"} sx={{ mt: 2 }}>
          예약 내용은 문자로 확인하실 수 있습니다.
        </Typography>

        <Typography variant={"h5"} component={"p"} sx={{ mt: 4 }}>
          예약 시 주의사항을 다시 한번 고지해드립니다.
        </Typography>

        <Grid xs={12} md={6}>
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
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReservationComplte;
