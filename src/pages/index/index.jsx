import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from '../home/home';
import { Active } from '../active/active';

import { NavBar } from '../../components/NavBar/NavBar';
import { NavTab } from '../../components/NavTab/NavTab';
import './index.scss';

import {store} from '../../redux/configureStore';

function YTAApplication({ location:{ pathname } }) {
  return (
    <>
      <NavBar id="navbar" title="Youtube Alarms">
        <NavTab to='/' active={pathname==='/'}>Home</NavTab>
        { [/*'History',*/ 'Active'].map( ( section )=>(
          <NavTab 
            to={ `/${section}` }
            key={ section }
            active={ `/${section}`===pathname }
          >
            {section}
          </NavTab>
        ))}
      </NavBar>

      <Route path={[ "//", "/alarms/:id?"]} component={Home}/>
      {/* <Route path="/history" component={}/> */}
      <Route 
        path="/Active" 
        children={ (match) => <Active display={match.match!==null}/> }
      />

    </>
  );
}

YTAApplication.propTypes = {
  location: PropTypes.object.isRequired
};

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/app/ytalarm/">
      <Route render={props => <YTAApplication {...props} />}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
