import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
        {/* <Footer /> */}
      </Container>
    </BrowserRouter>
  );
}

export default App;
