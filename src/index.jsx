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
import appMessages from './i18n';

import './index.scss';
import Home from './components/home-page/Home';
import OverviewPage from './components/dashboard/overview-page/OverviewPage';
import Discover from './components/discover-page/Discover';
import Search from './components/search-page/Search';
import NotFound from './components/notFount-page/NotFound';
import PartnersList from './components/partners-list-page/PartnersList';
import CoursePage from './components/course-info-page/CoursePage';
import ProgramPage from './components/program-info-page/ProgramPage';
import ScrollToTop from './ScroollToTop';
import Instructor from './components/instructor-page/Instructor';
import PartnerInfo from './components/partner-page/PartnerInfo';
import store from './redux/store/store';
import Layout from './components/shared/layout-wrapper/Layout';
import EnrollmentList from './components/dashboard/EnrollmentList';
import MobileProfile from './components/shared/header-component/Header/MobileHeader/MobileProfile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set staleTime to 5 minutes
      staleTime: 5 * 60 * 1000,
      // Set cacheTime to 60 minutes
      cacheTime: 60 * 60 * 1000,
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
