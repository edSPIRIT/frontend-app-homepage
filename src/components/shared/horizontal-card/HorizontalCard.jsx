/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Dropdown,
  Icon,
  IconButton,
  ProgressBar,
} from '@edx/paragon';
import classNames from 'classnames';
import React from 'react';
import {
  Info, MoreVert, Share, Check,
} from '@edx/paragon/icons';

const HorizontalCard = ({
  isProgram,
  progressValue,
  isStarted = true,
  isCompleted,
  showButtons = true,
}) => {
  const isSmall = false;
  const courseStatus = () => {
    if (isCompleted) {
      return (
        <div className="d-flex">
          <Icon className="info-icon" src={Check} />
          <span className="second-title">Completed</span>
        </div>
      );
    }
    if (isStarted) {
      return (
        <div className="d-flex">
          <Icon className="info-icon" src={Info} />
          <span className="second-title">Not started yet</span>
        </div>
      );
    }
    return null;
  };
  return (
    <Card
      className={classNames('mb-4 horizontal-card-course', {
        'dark-background': isProgram,
      })}
      orientation={isSmall ? 'vertical' : 'horizontal'}
    >
      <Card.ImageCap src="https://picsum.photos/360/200/" srcAlt="Card image" />
      <Card.Body>
        <Card.Section>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h3 className="mr-5">Anatomy: Musculoskeletal and Integumentary Systems</h3>
            {!isCompleted && showButtons && (
            <div className="d-flex align-items-center btn-wrapper">
              <Icon src={Share} className="mr-3 share-icon" />
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-toggle-with-iconbutton"
                  as={IconButton}
                  src={MoreVert}
                  iconAs={Icon}
                  variant="primary"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Unrolled</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            )}
          </div>
          <p className="mb-3.5 org-title">Michigan X • Audit</p>
          <p className="second-title">Access expired on 22 Jul 2022</p>
          <div className="d-flex align-items-center justify-content-between  mt-4.5">
            {progressValue ? <ProgressBar now={progressValue} label={`${progressValue}%`} /> : courseStatus()}
            { showButtons && (
            <div className="d-flex">
              { !isCompleted && (
              <Button className="mr-1.5" variant="outline-primary">
                Upgrade
              </Button>
              )}
              <Button>View {isProgram ? 'Program' : 'Course'}</Button>
            </div>
            )}
          </div>
        </Card.Section>
      </Card.Body>
    </Card>
  );
};

export default HorizontalCard;
