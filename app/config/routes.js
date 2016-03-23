import React from 'react';
import Main from '../components/main';
import Home from '../components/home';
import Profile from '../components/profile';

import { Router, Route, DefaultRoute } from 'react-router';


export default (
  <Route name="app" path="/" handler={Main}>
    <DefaultRoute handler={Home} />
    <Route name="profile" path="profile/:username" handler={Profile} />
  </Route>
);
