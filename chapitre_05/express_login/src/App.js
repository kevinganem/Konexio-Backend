// ROUTER
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// IMPORT
import Admin from "./frontend/pages/Admin";
import Login from "./frontend/pages/Login";
import Signup from "./frontend/pages/Signup";
import Home from "./frontend/pages/Home";
import NotFound from "./frontend/pages/NotFound";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="nav justify-content-center p-3 fs-3">
        <Link className="p-2 nav-item nav-link" to="/">
          Home
        </Link>
        <Link className="p-2 nav-item nav-link" to="/admin">
          Admin
        </Link>
        <Link className="p-2 nav-item nav-link" to="/login">
          Login
        </Link>
        <Link className="p-2 nav-item nav-link" to="/signup">
          Sign Up
        </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
