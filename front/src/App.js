import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { styled } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Theme from "./components/Theme";
import Reservation from "./components/Reservation";
import Main from "./components/Main";

// const StyledContainer2 = styled(Container)({
//   minHeight: "90vh",
// });

const StyledContainer = styled(Container)({
  // minHeight: "100vh",
  // justifyContent: "space-between",
  display: "flex",
  flexDirection: "column",
});

const StyledContent = styled(Container)(({ theme }) => ({
  minHeight: "75vh",
  marginTop: 50,
  [theme.breakpoints.down("lg")]: {
    marginTop: 30,
  },
}));

function App() {
  return (
    <>
      <StyledContainer>
        <Header />

        <StyledContent>
          <Switch>
            <Route path="/theme" component={Theme} />
            <Route path="/reservation" component={Reservation} />
            <Route path="/" component={Main} />
          </Switch>
        </StyledContent>
      </StyledContainer>
      <Footer />
    </>
  );
}

export default App;
