import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import UserListContainer from 'src/container/UserListContainer';

const Routes  = [
  <Route key={0} exact={true} path="/" component={UserListContainer} />,
];

const MainRoutes = () => (
  <div>
    <Switch>
      {Routes}
    </Switch>
  </div>
);

export default MainRoutes;