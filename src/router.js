import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/login/Login.jsx';
import List from './routes/list/List.jsx';
import Detail from './routes/detail/Detail.jsx';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/list" exact component={List} />
        <Route path="/detail" exact component={Detail} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
