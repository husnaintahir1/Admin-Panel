import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <Router>
      {" "}
      <Header />
    </Router>
  );
}

export default App;
