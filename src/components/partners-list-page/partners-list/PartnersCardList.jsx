import {
  Card, Icon, IconButton, Pagination,
} from '@edx/paragon';
import { ArrowForward, BookOpen, DrawShapes } from '@edx/paragon/icons';
import React from 'react';

const PartnersCardList = () => (
  <>
    <div className="partners-list-wrapper">
      {Array(12).fill(1).map((i) => (
        <Card orientation="horizontal" key={i}>
          <Card.ImageCap
            src="https://picsum.photos/360/200/"
            srcAlt="Card image"
          />
          <Card.Body>
            <Card.Section>
              <div className="d-flex justify-content-between align-items-center mb-2.5">
                <h3 className="mr-5">
                  Partner name
                </h3>
                <IconButton
                  src={ArrowForward}
                  iconAs={Icon}
                  alt="ArrowForward"
                  onClick={() => {}}
                  variant="light"
                />
              </div>
              <p className="mb-3.5">
                Massachusetts Institute of Technology — a coeducational,
                privately endowed research university founded in 1861 — is
                dedicated to advancing knowledge and educating students in
                science, technology, and other areas of scholarship that will
                best serve the nation and the world in the 21st century. Learn
                more about MIT. Through MITx, the Institute furthers its
                commitment to improving education worldwide.
              </p>
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
          </Card.Body>
        </Card>
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

export default PartnersCardList;
