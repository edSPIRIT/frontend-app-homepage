import {
  Card, Icon, IconButton, Pagination,
} from '@edx/paragon';
import { ArrowForward, BookOpen, DrawShapes } from '@edx/paragon/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PartnersCardList = ({ partnersData }) => (
  <>
    <div className="partners-list-wrapper">
      {partnersData?.map((partner) => (
        <Link
          to={`/partners/${partner.organization?.short_name}`}
          key={partner.organization.id}
        >
          <Card orientation="horizontal">
            <Card.ImageCap
              src={partner.organization.logo}
              srcAlt="Card image"
            />
            <Card.Body>
              <Card.Section>
                <div className="partner-name-wrapper mb-2.5">
                  <h3 className="mr-5">{partner.organization.name}</h3>
                  <IconButton
                    className="arrow-forward-btn"
                    src={ArrowForward}
                    iconAs={Icon}
                    alt="ArrowForward"
                    variant="light"
                  />
                </div>
                <p className="mb-3.5">
                  {partner.organization.description}
                </p>
                <div className="d-flex icons-partner-wrapper mt-3">
                  <div className="d-flex mr-2.5">
                    <Icon className="mr-1" src={DrawShapes} />
                    <span>0</span>
                  </div>
                  <div className="d-flex">
                    <Icon className="mr-1" src={BookOpen} />
                    <span> {partner.courses_count}</span>
                  </div>
                </div>
              </Card.Section>
            </Card.Body>
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
PartnersCardList.propTypes = {
  partnersData: PropTypes.shape([]),
};
PartnersCardList.defaultProps = {
  partnersData: [],
};
export default PartnersCardList;
