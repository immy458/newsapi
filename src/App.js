import "./App.css";
import News from "./News";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Route, Switch, Redirect } from "react-router-dom";
import Favourite from "./Favourite";
import GetNews from "./NewsForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={GetNews} />
          <Route exact path="/news" component={News} />
          <Route exact path="/favourite" component={Favourite} />
          <Redirect to="/" />{" "}
        </Switch>
      </header>
    </div>
  );
}

export default App;
