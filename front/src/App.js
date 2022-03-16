import "./App.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { styled } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Theme from "./components/theme/Theme";
import Reservation from "./components/reservation/Reservation";
import Main from "./components/Main";
import Modal from "./components/common/Modal";
import { Grid } from "@material-ui/core";
import Div100vh from "react-div-100vh";
import { Helmet } from "react-helmet-async";

// const StyledContainer2 = styled(Container)({
//   minHeight: "90vh",
// });

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
});

export const StyledContent = styled(Grid)(({ theme, center, height }) => ({
  minHeight: (height / 4) * 3,
  alignItems: "center",
  marginTop: 50,
  [theme.breakpoints.down("lg")]: {
    marginTop: 30,
  },
}));

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Div100vh>
        <Helmet>
          <title>코드네임</title>
          <link rel="부천 방탈출 카페" href="http://코드네임.com" />
        </Helmet>

        <StyledContainer>
          {/* <Modal open={isOpen} setOpen={setIsOpen}>
            <div>
              불편을 드려 죄송합니다. 현재 홈페이지 리뉴얼 중으로 홈페이지 예약이 불가합니다. 아래
              링크(네이버 플레이스)로 예약 부탁드립니다. 감사합니다.
            </div>
            <div>
              <a
                href={
                  "https://pcmap.place.naver.com/place/1319207960/ticket?bookingRedirectUrl=https://m.booking.naver.com/booking/12/bizes/631006&entry=plt&from=map&fromPanelNum=1&ts=1647404432332#adPromotion"
                }
              >
                네이버 예약 바로가기
              </a>
            </div>
          </Modal> */}
          <Header />

          <Switch>
            <Route path="/theme" component={Theme} />
            <Route path="/reservation" component={Reservation} />
            <Route path="/" component={Main} />
          </Switch>
        </StyledContainer>
        <Footer />
      </Div100vh>
    </>
  );
}

export default App;
