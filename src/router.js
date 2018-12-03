import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/login/Login.jsx';
import List from './routes/list/List.jsx';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/list" exact component={List} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
