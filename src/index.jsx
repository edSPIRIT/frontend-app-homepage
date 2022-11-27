import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import { Route, Switch } from 'react-router';
import appMessages from './i18n';
import HomePage from './components/homePage/HomePage';

import './index.scss';
import DataTable from './components/testDataTable/DataTableComponent';

subscribe(APP_READY, () => {
  ReactDOM.render(

    <AppProvider>
      <Header />
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/data" component={DataTable} />
      </Switch>
      <Footer />
    </AppProvider>,

    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
});
