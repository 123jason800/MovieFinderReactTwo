import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Movie from './Movie';

function App() {
    return (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Movie Finder 2</Link>
          
        </nav>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/movie/:id" component={Movie}/>
        </Switch>
    </Router>
  );
}

export default App;
