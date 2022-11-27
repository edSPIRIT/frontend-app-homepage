import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import { ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material';
import { Route, Switch } from 'react-router';
import appMessages from './i18n';
import HomePage from './components/homePage/HomePage';

import './index.scss';
import DataTable from './components/testDataTable/DataTableComponent';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#00AF8F',
      main: '#00d1ab',
      A100: '#00d1abb3',
      100: '#c8f5ed',
      200: '#dcf9f3',
      300: '#e4faf6',
      A200: '#e4faf680',
    },
    secondary: {
      dark: '#048f9c',
      main: '#09b6c7',
      A100: '#09b6c7b3',
      100: '#84dbe3',
      A200: '#84dbe380',
      200: '#cdeff3',
      light: '#e6f7f9',
      A400: '#e6f7f999',
      A700: '#e6f7f980',
    },
    grey: {
      100: '#dedcdd',
      200: '#f3f3f3',
      300: '#f3f3f3',
      400: '#f3f3f3',
      500: '#f3f3f3',
      600: '#f3f3f3',
      700: '#f9f9f9',
      800: '#ffffff',
    },
    error: {
      dark: '#d33b3b',
      main: '#e94d4d',
      100: '#fe8e8c',
      200: '#f0d2bf',
      light: '#fdeeee',
      A100: '#fdeeee80',
    },
  },
});
subscribe(APP_READY, () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>

      <AppProvider>
        <Header />
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/data" component={DataTable} />
        </Switch>
        <Footer />
      </AppProvider>
    </ThemeProvider>,

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
