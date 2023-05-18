import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path= "/home" component = {Home} />
    <Route exact path= "/create" component = {CreateDog} />
    <Route path='/detail/:id' component={Detail } />
    
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
