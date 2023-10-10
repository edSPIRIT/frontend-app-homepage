/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import {
  ActionRow,
  AlertModal,
  Button,
  Icon,
} from '@edx/paragon';
import { Info, MoreVert } from '@edx/paragon/icons';

import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { useState } from 'react';
import { determineDirection } from '../../../../utils/determineDirection';
import CourseDateStatus from './TopCardSection/CourseDateStatus';
import TopIcons from './TopCardSection/TopIcons';
import messages from '../../../../messages';
import { setToastMessage } from '../../../../redux/slice/toastSlice';

const TopCardSection = ({
  courseInfo,
  openMoreBtnModal,
  certificateData,
  intl,
}) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [isOpen, setOpen] = useState(false);

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

  const handleUnenroll = (e) => {
    e.preventDefault();
    deleteEnrollCourse.mutate(courseInfo?.course_details?.course_id);
    dispatch(
      setToastMessage(
        intl.formatMessage(messages['userCourseCard.unrollMessage.text']),
      ),
    );
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        className="course-info-alert"
        title={intl.formatMessage(messages['unenroll.alert.title'])}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        variant="danger"
        icon={Info}
        footerNode={(
          <ActionRow>
            <ActionRow>
              <Button
                variant="tertiary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <FormattedMessage id="cancel.button" defaultMessage="Cancel" />
              </Button>
              <Button variant="danger" onClick={(e) => handleUnenroll(e)}>
                <FormattedMessage
                  id="userCourseCard.unroll.text"
                  defaultMessage="Unenroll"
                />
              </Button>
            </ActionRow>
          </ActionRow>
        )}
      >
        <p>
          <FormattedMessage
            id="courseInfo.unenrollMessage.text"
            defaultMessage="When you unenroll, your courses will be removed from your dashboard"
          />
        </p>
      </AlertModal>
      <div>
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
          <TopIcons
            certificateData={certificateData}
            courseInfo={courseInfo}
            openMoreBtnModal={openMoreBtnModal}
            setOpen={setOpen}
          />
        </div>
        <Link
          className="mb-3.5 org-title"
          to={`/partners/${courseInfo?.organization?.short_name}`}
        >
          {courseInfo?.organization?.name}
        </Link>
        <CourseDateStatus courseInfo={courseInfo} />
      </div>
    </>
  );
};

export default injectIntl(TopCardSection);
