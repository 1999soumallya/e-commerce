import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from "./Screens/HomeScreen";
import ProductDetails from "./Screens/ProductDetails";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <>
          <main className="m-3">
            <Container>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/product/:id" component={ProductDetails} />
              <Route exact path="/cart/:id?" component={CartScreen} />
              <Route exact path="/signin" component={LoginScreen} />
            </Container>
          </main>
        </>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
