import './App.css';

// You can specify which plugins you need
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './LandingPage/nav';
import Main from './LandingPage/Main';
import Login from './LoadingPage/Login';
import SignUp from './LoadingPage/SignUp';

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className="d-flex" style={{justifyContent:'center'}}>
        <SignUp/>
        <Login/>
      </div>
      <Main/>
    </div>
  );
}

export default App;
