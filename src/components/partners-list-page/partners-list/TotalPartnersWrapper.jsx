/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Skeleton } from '@edx/paragon';
import PropTypes from 'prop-types';

import {

  GridView,
  ListView,
} from '@edx/paragon/icons';
import classNames from 'classnames';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import SortPartnersWrapper from './total-partners-wrapper/SortPartnersWrapper';

const TotalPartnersWrapper = ({
  view, setView, count, loading,
}) => (
  <div className="d-flex justify-content-between align-items-center mb-4 mt-4.5">
    <p>
      <span className="font-sm text-gray-500">
        <FormattedMessage
          id="total.text"
          defaultMessage="Total:"
        />
      </span>
      {loading ? (
        <Skeleton height={20} width={20} className="ml-1" />
      ) : (
        <span className="font-weight-bold total-count"> {count}</span>
      )}
    </p>
    <div className="d-flex align-items-center">
      <SortPartnersWrapper />
      <div className="d-flex align-items-center icons-view-wrapper ml-4">
        <div className="icon-view" onClick={() => setView('grid')}>
          <Icon
            className={classNames({
              active: view === 'grid',
            })}
            src={GridView}
          />
        </div>
        <div className="icon-view" onClick={() => setView('list')}>
          <Icon
            className={classNames({
              active: view === 'list',
            })}
            src={ListView}
          />
        </div>
      </div>
    </div>
  </div>
);
TotalPartnersWrapper.propTypes = {
  view: PropTypes.string,
  setView: PropTypes.func,
  count: PropTypes.number,
  loading: PropTypes.bool,
};
TotalPartnersWrapper.defaultProps = {
  view: 'grid',
  setView: () => {},
  count: 0,
  loading: false,
};
export default TotalPartnersWrapper;
