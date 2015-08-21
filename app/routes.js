import { Route } from 'react-router';
import React from 'react';

import AppLayout from 'components/AppLayout/AppLayout';
import HelloApp from 'components/HelloApp/HelloApp';
import AboutPage from 'components/AboutPage/AboutPage';

export default (
  <Route component={AppLayout}>
    <Route name='home' path='/' component={HelloApp}/>
    <Route name='about' path='/about' component={AboutPage}/>
  </Route>
);
