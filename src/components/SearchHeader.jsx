/* eslint-disable camelcase */
// variables taken from algolia not in camelcase
import React from 'react';

import {
  Col, Container, Row, SearchField,
} from '@edx/paragon';
import { injectIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

const SearchHeader = () => (
  <div className="bg-brand-primary">
    <div className="container-search">
      <Row className="pt-4 pb-3">
        <Col
          className={classNames('fe__searchbox-col', { 'fe__searchbox-col--default': true })}
          xs={12}
          md={8}
        >
          <SearchField
            onSubmit={value => console.log(`search submitted: ${value}`)}
          />
        </Col>
        <Col
          className={classNames('fe__searchbox-col', { 'fe__searchbox-col--default': true })}
          xs={12}
        />
      </Row>
    </div>
  </div>
);
SearchHeader.defaultProps = {
  onClick: () => {},
};

SearchHeader.propTypes = {

};

export default injectIntl(SearchHeader);
