/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import {
  FormattedDate,
  FormattedMessage,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import {
  Dropdown, Icon, IconButton, useMediaQuery,
} from '@edx/paragon';
import { Close, MoreVert, Share } from '@edx/paragon/icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToastMessage } from '../../../../redux/slice/toastSlice';
import { determineDirection } from '../../../../utils/determineDirection';
import SharedToastMessage from '../../base-components/SharedToastMessage';
import messages from '../../../../messages';

const TopCardSection = ({ courseInfo, openMoreBtnModal, intl }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deleteEnrollCourse = useMutation({
    mutationFn: (courseId) => getAuthenticatedHttpClient().post(
      `${getConfig().LMS_BASE_URL}/admin-console/api/openedx/api/unenroll/`,
      {
        course_id: courseId,
      },
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['OverviewList']);
      queryClient.invalidateQueries(['EnrollmentList']);
      queryClient.invalidateQueries(['enrollmentStatus']);
    },
  });
  const isTablet = useMediaQuery({ maxWidth: '920px' });
  const courseCompleted = courseInfo?.progress?.complete_count > 0
    && courseInfo?.progress?.incomplete_count === 0;

  return (
    <div onMouseLeave={() => setIsOpenDropDown(false)}>
      <div className="d-flex justify-content-between align-items-center mb-1 title-wrapper">
        <h3
          style={{
            direction:
              determineDirection(courseInfo?.course_details?.course_name)
              === 'rtl'
                ? 'rtl'
                : 'ltr',
          }}
          className="course-title"
        >
          {courseInfo?.course_details?.course_name}
        </h3>
        {/* more vertical for mobile view display none in web */}
        <div
          className="more-vert-wrapper m-3"
          onClick={(e) => {
            e.preventDefault();
            openMoreBtnModal();
          }}
        >
          <Icon className="" src={MoreVert} />
        </div>
        {/* more vertical for tablet view  */}
        {isTablet ? (
          <div
            className="more-vert-tablet-wrapper "
            onClick={(e) => {
              e.preventDefault();
              openMoreBtnModal();
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
                  `${getConfig().BASE_URL}/homepage/course/${
                    courseInfo?.course_metadata?.slug
                  }`,
                );
                dispatch(setToastMessage(<SharedToastMessage />));
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
              {isOpenDropDown && (
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      deleteEnrollCourse.mutate(
                        courseInfo?.course_details?.course_id,
                      );
                      dispatch(
                        setToastMessage(
                          intl.formatMessage(
                            messages['userCourseCard.unrollMessage.text'],
                          ),
                        ),
                      );
                    }}
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
        )}
      </div>
      <Link
        className="mb-3.5 org-title"
        to={`/partners/${courseInfo?.organization?.short_name}`}
      >
        {courseInfo?.organization?.name}
      </Link>
      <p className="course-date-title">
        {!courseCompleted && (
          <>
            <span>
              <FormattedMessage
                id="userCourseCard.courseStart.text"
                defaultMessage="Course Start - "
              />
            </span>
            <span>
              <FormattedDate
                value={courseInfo?.course_details?.course_start}
                day="numeric"
                month="short"
                year="numeric"
              />
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default injectIntl(TopCardSection);
