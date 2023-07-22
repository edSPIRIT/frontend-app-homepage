import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { NavLink } from 'react-router-dom';

const NavHeader = () => (
  <nav>
    <ul className="nav-wrapper">
      <NavLink to="/overview" activeClassName="active">
        <div className="border-bottom" />
        <li>
          <FormattedMessage
            id="header.nav.overview"
            defaultMessage="Overview"
          />
        </li>
      </NavLink>
      <NavLink to="/inprogress" activeClassName="active">
        <li>
          <div className="border-bottom" />
          <FormattedMessage
            id="header.nav.inProgress"
            defaultMessage="In Progress"
          />
        </li>
      </NavLink>
      <NavLink to="/completed" activeClassName="active">
        <li>
          <div className="border-bottom" />
          <FormattedMessage
            id="header.nav.completed"
            defaultMessage="Completed"
          />
        </li>
      </NavLink>
      <NavLink exact to="/discover" activeClassName="active">
        <li>
          <div className="border-bottom" />
          <FormattedMessage
            id="header.nav.discover"
            defaultMessage="Discover"
          />
        </li>
      </NavLink>
    </ul>
  </nav>
);

export default NavHeader;
