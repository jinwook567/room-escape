import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider, styled } from "@material-ui/core";
import { DesktopGrid, MobileGrid } from "./common/Grid";
import { Stack } from "@mui/material";
import Modal from "./common/Modal";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <StyledDivider />
      <DesktopGrid>
        <Grid container spacing={3} justify={"center"}>
          <Grid item>
            <Typography variant="h7">상호:코드네임</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h7">주소:경기 부천시 부일로 459번길 40, 6층</Typography>
          </Grid>
          {/* <Grid item>
          <Typography variant="h7">Tel:</Typography>
        </Grid> */}
        </Grid>
        <Grid container spacing={3} justify={"center"}>
          <Grid item>
            <Typography variant="h7">Tel:032-719-8771</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h7">E-mail:codename921128@gmail.com</Typography>
          </Grid>
          {/* <Grid item>
          <Typography variant="h7">상호:블라블라블라</Typography>
        </Grid> */}
        </Grid>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <div
              style={{
                backgroundColor: "black",
                height: "44px",
                width: "200px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "20px",
                marginBottom: "20px",
              }}
              onClick={() => setIsOpen(true)}
            >
              <Typography style={{ color: "white", fontWeight: "bold" }}>
                개인정보처리방침
              </Typography>
            </div>
          </Grid>
        </Grid>
      </DesktopGrid>
      <MobileGrid container justifyContent={"center"}>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant="h7">상호:코드네임</Typography>
          <Typography variant="h7">주소:경기 부천시 부일로 459번길 40, 6층</Typography>
          <Typography variant="h7">Tel:032-719-8771</Typography>
          <Typography variant="h7">E-mail:codename921128@gmail.com</Typography>
          <Grid container justifyContent={"center"}>
            <div
              style={{
                backgroundColor: "black",
                height: "44px",
                width: "200px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "10px",
              }}
              onClick={() => setIsOpen(true)}
            >
              <Typography style={{ color: "white", fontWeight: "bold" }}>
                개인정보처리방침
              </Typography>
            </div>
          </Grid>
        </Stack>
      </MobileGrid>
      <Modal open={isOpen} setOpen={setIsOpen}>
        <Typography variant={"body2"} component={"p"}>
          {`제 1조 (총칙) 코드네임은 고객의 개인정보보호를 매우 중요시하며, 정보통신망법 등 관련 법규를
        준수하고 있습니다.`}
        </Typography>
        <Typography variant={"body2"} component={"p"}>
          회사는 개인정보처리방침을 통하여 고객께서 제공하시는 개인정보가 어떠한 용도와 방식으로
          이용되고 있으며 개인정보보호를 위하여 어떠한 조치를 취하고 있는지 알려드립니다.
        </Typography>
        <Typography variant={"body2"} component={"p"}>
          제 2조 (개인정보수집/이용 등에 대한 동의방법) 고객님의 개인정보 수집, 이용, 제3자 제공 및
          처리업무의 위탁 등에 대한 고객동의의 방법은 서비스 예매 시 게시된 ‘동의 버튼’을
          클릭함으로써 완료됩니다.
        </Typography>
        <Typography variant={"body2"} component={"p"}>
          제 3조 (개인정보의 수집, 이용 목적 및 항목) 1. 개인정보의 수집 및 이용 목적 ① 서비스 예매
          확인 및 취소 관리 2. 수집, 이용 항목 ① 이름 ② 휴대폰번호 제 4조 (개인정보의 보유/이용 기간
          및 파기) 개인정보의 수집목적 또는 제공 받은 목적이 달성되면 즉시 파기합니다.
        </Typography>
      </Modal>
    </div>
  );
}

const StyledDivider = styled(Divider)({
  height: "5px",
  color: "black",
  marginTop: "50px",
  marginBottom: "30px",
  backgroundColor: "black",
  borderRadius: "20px",
});

export default Footer;
