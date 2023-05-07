/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import {
  Dropdown, Icon, IconButton, useMediaQuery,
} from '@edx/paragon';
import { Close, MoreVert, Share } from '@edx/paragon/icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

const TopCardSection = ({ courseInfo, openMoreBtn }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const queryClient = useQueryClient();
  const deleteEnrollCourse = useMutation({
    mutationFn: (courseId) => getAuthenticatedHttpClient().post(
      `${getConfig().LMS_BASE_URL}/admin-console/api/openedx/api/unenroll/`,
      {
        course_id: courseId,
      },
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['EnrollmentList']);
      // setShowToast(true);
    },
  });
  const isTablet = useMediaQuery({ maxWidth: '768px' });
  const courseCompleted = courseInfo?.progress?.complete_count > 0
    && courseInfo?.progress?.incomplete_count === 0;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-1 title-wrapper">
        <h3 className="course-title">
          {courseInfo?.course_details?.course_name}
        </h3>
        <div
          className="more-vert-wrapper m-3"
          onClick={(e) => {
            e.preventDefault();
            openMoreBtn();
          }}
        >
          <Icon className="" src={MoreVert} />
        </div>
        {isTablet ? (
          <div
            className="more-vert-tablet-wrapper "
            onClick={(e) => {
              e.preventDefault();
              openMoreBtn();
            }}
          >
            <Icon className="" src={MoreVert} />
          </div>
        ) : (
          <div className="d-flex align-items-center icons-wrapper">
            <Icon
              src={Share}
              className="mr-3 share-icon"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(
                  `https://apps.${getConfig().LMS_BASE_URL.replace(
                    'https://',
                    '',
                  )}/homepage/course/${courseInfo?.course_metadata?.slug}`,
                );
              }}
            />
            <Dropdown
              className="dropdown-icon"
              onToggle={(isOpenMore) => setIsOpenDropDown(isOpenMore)}
              onClick={(e) => {
                e.preventDefault();
              }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    deleteEnrollCourse.mutate(
                      courseInfo?.course_details?.course_id,
                    );
                  }}
                >
                  Unroll
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      <Link
        className="mb-3.5 org-title"
        to={`/partners/${courseInfo?.organization?.short_name}`}
      >
        {courseInfo?.organization?.name}
      </Link>
      {!courseCompleted && (
        <p className="course-date-title">
          <span>Course Start - </span>
          <span>
            {new Date(courseInfo?.course_details?.course_start).toLocaleString(
              'en-US',
            )}
          </span>
        </p>
      )}
    </>
  );
};

export default TopCardSection;
