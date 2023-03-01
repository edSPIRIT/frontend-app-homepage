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
import React, { useState } from 'react';
import {
  Info, MoreVert, Share, Check, Close,
} from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import cardPlaceholder from '../../../assets/card-placeholder.png';

const HorizontalCard = ({
  isProgram,
  progressValue,
  isStarted = true,
  isCompleted,
  showButtons = true,
  course,
}) => {
  const isSmall = false;
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const deleteEnroll = async (courseId) => getAuthenticatedHttpClient().post(
    `${getConfig().LMS_BASE_URL}/admin-console/api/openedx/api/unenroll/`,
    {
      course_id: courseId,
    },
  );
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
      <Card.ImageCap
        src={
          `${getConfig().LMS_BASE_URL}${course?.course_image_url}`
          ?? cardPlaceholder
        }
        srcAlt="Card image"
      />
      <Card.Body>
        <Card.Section>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h3 className="mr-5">{course?.course_name}</h3>
            {/* {!isCompleted && showButtons && ( */}
            <div className="d-flex align-items-center btn-wrapper">
              <Icon
                src={Share}
                className="mr-3 share-icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              />
              <Dropdown
                className="dropdown-icon"
                onToggle={(isOpen) => setIsOpenDropDown(isOpen)}
              >
                <Dropdown.Toggle
                  id="dropdown-toggle-with-iconbutton"
                  as={IconButton}
                  src={isOpenDropDown ? Close : MoreVert}
                  iconAs={Icon}
                  variant="primary"
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => deleteEnroll(course?.course_id)}
                  >
                    Unrolled
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* )} */}
          </div>
          <p className="mb-3.5 org-title">Michigan X</p>
          <div className="d-flex align-items-center justify-content-between">
            {progressValue ? (
              <ProgressBar now={progressValue} label={`${progressValue}%`} />
            ) : (
              courseStatus()
            )}
            {showButtons && (
              <div className="d-flex">
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
