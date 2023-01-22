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

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Layout>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/overview" component={OverviewPage} />
          <Route exact path="/dashboard" component={OverviewPage} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/discover/search" component={Search} />
          <Route exact path="/inprogress" component={InProgress} />
          <Route exact path="/completed" component={Completed} />
          <Route exact path="/partners" component={PartnersList} />
          <Route exact path="/course/:slug/">
            <CoursePage />
          </Route>
          <Route exact path="/partners/:slug">
            <PartnerPage />
          </Route>
          <Route exact path="/bio/:slug">
            <Instructor />
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="/*" component={NotFound} />
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
