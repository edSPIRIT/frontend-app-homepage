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
import HeaderED from './components/header-edspirit/HeaderED';
import HomePage from './components/homePage/HomePage';
import Footer from './components/footer/Footer';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <HeaderED />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
      <Footer />
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
