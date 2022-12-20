import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import { Route, Switch } from 'react-router';
import appMessages from './i18n';

import './index.scss';
import Home from './components/home-page/Home';
import Layout from './components/shared/Layout';
import Search from './pages/Search';
import InProgress from './pages/InProgress';
import Completed from './pages/Completed';
import DashboardPage from './components/dashboard-page/DashboardPage';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Layout>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/overview" component={DashboardPage} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/inProgress" component={InProgress} />
          <Route exact path="/complete" component={Completed} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </AppProvider>,

    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root'),
  );
});

initialize({
  messages: [appMessages],
});
