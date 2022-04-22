import AddTask from "./pages/AddTask.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import FetchTask from "./pages/AllTasks";
function App() {
  return (
    <div>
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <Route path="/addTask" component={AddTask}></Route>
            <Route path="/fetchTask" component={FetchTask}></Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
