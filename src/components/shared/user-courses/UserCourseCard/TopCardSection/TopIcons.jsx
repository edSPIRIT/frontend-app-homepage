/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import {
  Dropdown, Icon, IconButton, useMediaQuery,
} from '@edx/paragon';
import { Close, MoreVert, Share } from '@edx/paragon/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { Link } from 'react-router-dom';

import SharedToastMessage from '../../../base-components/SharedToastMessage';
import { setToastMessage } from '../../../../../redux/slice/toastSlice';
import { showUnenrollAlert } from '../../../../../redux/slice/course/unenrollAlert';

const TopIcons = ({ certificateData, courseInfo, openMoreBtnModal }) => {
  const dispatch = useDispatch();

  const isTablet = useMediaQuery({ maxWidth: '768px' });

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  return (
    <div className="d-flex align-items-center icons-wrapper">
      <Icon
        src={Share}
        className="mr-3 share-icon"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(
            `${getConfig().BASE_URL}/homepage/course/${
              courseInfo?.course_metadata?.slug
            }`,
          );
          dispatch(setToastMessage(<SharedToastMessage />));
        }}
      />
      <Dropdown
        className="dropdown-icon"
        onToggle={(isOpenMore) => {
          if (!isTablet) {
            setIsOpenDropDown(isOpenMore);
          }
        }}
        onClick={(e) => {
          e.preventDefault();
          if (isTablet) {
            openMoreBtnModal();
          }
        }}
      >
        <Dropdown.Toggle
          id="dropdown-toggle-with-iconbutton"
          as={IconButton}
          src={isOpenDropDown ? Close : MoreVert}
          iconAs={Icon}
          variant="primary"
        />
        {isOpenDropDown && (
          <Dropdown.Menu>
            {certificateData && (
              <Dropdown.Item
                href={`${getConfig().LEARNING_BASE_URL}/course/${
                  courseInfo?.course_details?.course_id
                }/home`}
              >
                <FormattedMessage
                  id="userCourseCard.resumeCourse.text"
                  defaultMessage="Resume Course"
                />
              </Dropdown.Item>
            )}
            <Dropdown.Item
              to={`/course/${courseInfo?.course_metadata?.slug}`}
              as={Link}
            >
              <FormattedMessage
                id="userCourseCard.courseInfo.button"
                defaultMessage="Course Info"
              />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => dispatch(
                showUnenrollAlert(courseInfo?.course_details?.course_id),
              )}
            >
              <FormattedMessage
                id="userCourseCard.unroll.text"
                defaultMessage="Unenroll"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};
export default injectIntl(TopIcons);
