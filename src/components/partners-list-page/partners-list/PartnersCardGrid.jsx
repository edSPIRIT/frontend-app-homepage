import {
  Card, Icon, Skeleton,
} from '@edx/paragon';
import { BookOpen, DrawShapes } from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PartnersCardGrid = ({ partnersData, loading }) => (
  <>
    <div className="partners-grid-wrapper mb-5.5">
      {loading
        ? Array(5)
          .fill(1)
          .map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={i}>
              <Card.ImageCap src="" srcAlt="Card image" />
              <Card.Section>
                <Skeleton width={206} height={24} />
                <div className="d-flex mt-3">
                  <Skeleton width={51} height={24} className="mr-3" />
                  <Skeleton width={51} height={24} />
                </div>
              </Card.Section>
            </Card>
          ))
        : partnersData?.map((partner) => (
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
    {/* TODO: do pagination */}
    {/* <Pagination
      className="d-flex justify-content-center pt-4.5 pb-5"
      paginationLabel="pagination navigation"
      pageCount={20}
      onPageSelect={() => console.log('page selected')}
    /> */}
  </>
);
PartnersCardGrid.propTypes = {
  partnersData: PropTypes.shape([]),
  loading: PropTypes.bool,
};
PartnersCardGrid.defaultProps = {
  partnersData: [],
  loading: false,
};
export default PartnersCardGrid;
