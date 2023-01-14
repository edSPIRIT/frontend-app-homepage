import { Card, Icon, Pagination } from '@edx/paragon';
import { BookOpen, DrawShapes } from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const PartnersCardGrid = () => (
  <>
    <div className="partners-grid-wrapper">
      {Array(20)
        .fill(1)
        .map((i) => (
          <Link to="/" key={i}>
            <Card isClickable>
              <Card.ImageCap
                src="https://picsum.photos/360/200/"
                srcAlt="Card image"
              />
              <Card.Section>
                <span className="font-weight-bold">Partner name</span>
                <div className="d-flex icons-partner-wrapper mt-3">
                  <div className="d-flex mr-2.5">
                    <Icon className="mr-1" src={DrawShapes} />
                    <span>438</span>
                  </div>
                  <div className="d-flex">
                    <Icon className="mr-1" src={BookOpen} />
                    <span>11</span>
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

export default PartnersCardGrid;
