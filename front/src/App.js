import "./App.css";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { styled } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Theme from "./components/Theme";
import Reservation from "./components/Reservation";
import Main from "./components/Main";
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
  return (
    <>
      <Div100vh>
        <Helmet>
          <title>코드네임</title>
          <link rel="부천 방탈출 카페" href="http://코드네임.com" />
        </Helmet>

        <StyledContainer>
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
