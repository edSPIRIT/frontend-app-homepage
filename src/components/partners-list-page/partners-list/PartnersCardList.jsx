import {
  Card, Icon, IconButton, Skeleton,
} from '@edx/paragon';
import { ArrowForward, BookOpen, DrawShapes } from '@edx/paragon/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';

const PartnersCardList = ({ partnersData, loading }) => (
  <div className="partners-list-wrapper">
    {loading
      ? Array(5)
        .fill(1)
        .map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card orientation="horizontal" key={i}>
            <Card.ImageCap src="" srcAlt="Card image" />
            <Card.Section>
              <Skeleton width="40%" height={24} className="mb-3" />
              <Skeleton count={2} width="100%" height={24} />
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
          <Card orientation="horizontal">
            <Card.ImageCap
              src={partner.organization.logo ?? logoPlaceholder}
              srcAlt="Card image"
            />
            <Card.Body>
              <Card.Section>
                <div className="partner-name-wrapper mb-2">
                  <h3 className="mr-5">{partner.organization.name}</h3>
                  <IconButton
                    className="arrow-forward-btn"
                    src={ArrowForward}
                    iconAs={Icon}
                    alt="ArrowForward"
                    variant="light"
                  />
                </div>
                <p className="mb-3.5">{partner.organization.description}</p>
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
);
PartnersCardList.propTypes = {
  partnersData: PropTypes.shape([]),
  loading: PropTypes.bool,
};
PartnersCardList.defaultProps = {
  partnersData: [],
  loading: false,
};
export default PartnersCardList;
