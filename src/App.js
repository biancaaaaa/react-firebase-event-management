import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import SignIn from "./components/SignIn";
import fire from "./config";
import SignUp from "./components/SignUp";
import {Loading} from "./components/Loading";
import CreateEvent from "./components/CreateEvent";
import NavBar from "./components/NavBar";
import Event from "./components/Event";
import EventList from "./components/EventList";

class App extends Component {
  state = {
    user: 'loading'
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }

  render() {
    const {user} = this.state;
    return (
      <div className="app">
        {
          user === 'loading' ?
            <Loading/> :
            <BrowserRouter>
              <React.Fragment>
                {user && <NavBar/>}
                <Switch>
                  <Route exact path="/" render={props =>
                    user ?
                      <EventList {...this.state}/> :
                      <Redirect to='/sign-in'/>
                  }/>
                  <Route exact path="/create-event" render={props =>
                    user ?
                      <CreateEvent {...props} {...this.state}/> :
                      <Redirect to='/sign-in'/>
                  }/>
                  <Route exact path="/event/:id" render={props =>
                    user ?
                      <Event {...props} {...this.state}/> :
                      <Redirect to='/sign-in'/>
                  }/>
                  <Route exact path="/sign-in" render={props =>
                    !user ?
                      <SignIn {...this.state}/> :
                      <Redirect to="/"/>
                  }/>
                  <Route exact path="/sign-up" render={props =>
                    !user ?
                      <SignUp {...this.state}/> :
                      <Redirect to="/"/>
                  }/>
                  <Redirect to="/"/>
                </Switch>
              </React.Fragment>
            </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;
