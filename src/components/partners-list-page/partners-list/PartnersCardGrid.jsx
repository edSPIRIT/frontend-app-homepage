import { Card, Icon, Pagination } from '@edx/paragon';
import { BookOpen, DrawShapes } from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PartnersCardGrid = ({ partnersData }) => (
  <>
    <div className="partners-grid-wrapper">
      {partnersData?.map((partner) => (
        <Link
          to={`/partners/${partner.organization?.short_name}`}
          key={partner.organization.id}
        >
          <Card isClickable>
            <Card.ImageCap
              src={partner.organization.logo}
              srcAlt="Card image"
            />
            <Card.Section>
              <span className="font-weight-bold partner-grid-name">
                {partner.organization.name}
              </span>
              <div className="d-flex icons-partner-wrapper mt-2.5">
                <div className="d-flex mr-2.5 align-items-center justify-content-center">
                  <Icon className="mr-1" src={DrawShapes} />
                  <span>0</span>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Icon className="mr-1" src={BookOpen} />
                  <span>{partner.courses_count}</span>
                </div>
              </div>
            </Card.Section>
          </Card>
        </Link>
      ))}
    </div>
    <Pagination
      className="d-flex justify-content-center pt-4.5 pb-5"
      paginationLabel="pagination navigation"
      pageCount={20}
      onPageSelect={() => console.log('page selected')}
    />
  </>
);
PartnersCardGrid.propTypes = {
  partnersData: PropTypes.shape([]),
};
PartnersCardGrid.defaultProps = {
  partnersData: [],
};
export default PartnersCardGrid;
