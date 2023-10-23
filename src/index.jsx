import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
  mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import { Route, Switch } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

import { Provider } from 'react-redux';
import { lazy } from 'react';
import appMessages from './i18n';

import './index.scss';
import Home from './components/home-page/Home';
import ScrollToTop from './ScroollToTop';
import store from './redux/store/store';
import Layout from './components/shared/layout-wrapper/Layout';
import EnrollmentList from './components/dashboard/EnrollmentList';
import MobileProfile from './components/shared/header-component/Header/MobileHeader/MobileProfile';

const OverviewPage = lazy(() => import('./components/dashboard/OverviewPage/OverviewPage'));
const Discover = lazy(() => import('./components/discover-page/Discover'));
const Search = lazy(() => import('./components/search-page/Search'));
const NotFound = lazy(() => import('./components/notFount-page/NotFound'));
const PartnersList = lazy(() => import('./components/partners-list-page/PartnersList'));
const CoursePage = lazy(() => import('./components/course-info-page/CoursePage'));
const ProgramPage = lazy(() => import('./components/program-info-page/ProgramPage'));
const Instructor = lazy(() => import('./components/instructor-page/Instructor'));
const PartnerInfo = lazy(() => import('./components/partner-page/PartnerInfo'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set staleTime to 5 minutes
      staleTime: 5 * 60 * 1000,
      // Set cacheTime to 60 minutes
      cacheTime: 60 * 60 * 1000,
      // Set the retry count for queries here
      retry: 1, // Set the retry count for queries here
    },
    mutations: {
      retry: 1, // Set the retry count for mutations here
    },
  },
});
subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <ScrollToTop />
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/profile">
                <MobileProfile />
              </Route>
              <Route exact path="/overview">
                {/* <ProtectedRoute> */}
                <OverviewPage />
                {/* </ProtectedRoute> */}
              </Route>
              <Route exact path="/discover">
                <Discover />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>
              <Route exact path="/inprogress">
                <EnrollmentList type="in-progress" />
              </Route>
              <Route exact path="/completed">
                <EnrollmentList type="completed" />
              </Route>
              <Route exact path="/partners">
                <PartnersList />
              </Route>
              <Route exact path="/course/:slug/">
                <CoursePage />
              </Route>
              <Route exact path="/program/:slug/">
                <ProgramPage />
              </Route>
              <Route exact path="/partners/:slug">
                <PartnerInfo />
              </Route>
              <Route exact path="/instructor/:slug">
                <Instructor />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/*">
                <NotFound />
              </Route>
            </Switch>
          </Layout>
          {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
        </QueryClientProvider>
      </Provider>
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
  // requireAuthenticatedUser: true,
  // hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig(
        {
          SUPPORT_URL: process.env.SUPPORT_URL,
          COACHING_ENABLED: process.env.COACHING_ENABLED || false,
          ENABLE_DEMOGRAPHICS_COLLECTION:
            process.env.ENABLE_DEMOGRAPHICS_COLLECTION || false,
          DEMOGRAPHICS_BASE_URL: process.env.DEMOGRAPHICS_BASE_URL,
          ENABLE_COPPA_COMPLIANCE: process.env.ENABLE_COPPA_COMPLIANCE || false,
          MARKETING_EMAILS_OPT_IN: process.env.MARKETING_EMAILS_OPT_IN || false,
          AC_LANGUAGES_API_URL: process.env.AC_LANGUAGES_API_URL,
          AC_INSTANCE_CONFIG_API_URL: process.env.AC_INSTANCE_CONFIG_API_URL,
        },
        'App loadConfig override handler',
      );
    },
  },
});
