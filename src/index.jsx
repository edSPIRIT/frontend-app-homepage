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
import { QueryClient, QueryClientProvider } from 'react-query';
import appMessages from './i18n';

import './index.scss';
import Home from './components/home-page/Home';
import Layout from './components/shared/Layout';
import OverviewPage from './components/overview-page/OverviewPage';
import InProgress from './components/inProgress-page/InProgress';
import Completed from './components/completed-page/Completed';
import Discover from './components/discover-page/Discover';
import Instructor from './components/bio-page/Instructor';
import Search from './components/search-page/Search';
import NotFound from './components/notFount-page/NotFound';
import PartnersList from './components/partners-list-page/PartnersList';
import PartnerPage from './components/partner-page/PartnerPage';
import CoursePage from './components/course-info-page/CoursePage';
import ProgramPage from './components/program-info-page/ProgramPage';
import ProtectedRoute from './ProtectedRoute';
import ScrollToTop from './ScroollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ScrollToTop />
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/overview">
              <ProtectedRoute>
                <OverviewPage />
              </ProtectedRoute>
            </Route>
            <Route exact path="/dashboard">
              <ProtectedRoute>
                <OverviewPage />
              </ProtectedRoute>
            </Route>
            <Route exact path="/discover">
              <Discover />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/inprogress">
              <ProtectedRoute>
                <InProgress />
              </ProtectedRoute>
            </Route>
            <Route exact path="/completed">
              <ProtectedRoute>
                <Completed />
              </ProtectedRoute>
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
              <PartnerPage />
            </Route>
            <Route exact path="/bio/:slug">
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
      </QueryClientProvider>
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
  // handlers: {
  //   config: () => {
  //     mergeConfig({
  //       SUPPORT_URL: process.env.SUPPORT_URL,
  //       COACHING_ENABLED: (process.env.COACHING_ENABLED || false),
  //       ENABLE_DEMOGRAPHICS_COLLECTION: (process.env.ENABLE_DEMOGRAPHICS_COLLECTION || false),
  //       DEMOGRAPHICS_BASE_URL: process.env.DEMOGRAPHICS_BASE_URL,
  //       ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
  //       MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
  //       AC_LANGUAGES_API_URL: process.env.AC_LANGUAGES_API_URL,
  //       AC_INSTANCE_CONFIG_API_URL: process.env.AC_INSTANCE_CONFIG_API_URL,
  //     }, 'App loadConfig override handler');
  //   },
  // },
});
