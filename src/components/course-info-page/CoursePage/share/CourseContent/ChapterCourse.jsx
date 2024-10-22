/* eslint-disable react/prop-types */
import {
  Button, Collapsible, Icon, IconButton, Skeleton,
} from '@edx/paragon';
import { useContext, useState } from 'react';
import {
  Minus, Plus, PlayCircle, Article,
} from '@edx/paragon/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import useGetButtonStatus from '../../../../../hooks/utils/useGetButtonStatus';
import useGetEnrollmentStatus from '../../../../../hooks/useGetEnrollmentStatus';

const ChapterCourse = ({
  section, loading, sectionCount, courseMetaData,
}) => {
  const [open, setOpen] = useState(!(sectionCount > 1));
  const { isCourseNotStarted, hasPreReqCourse, warningComponent } = useGetButtonStatus(courseMetaData);
  const { authenticatedUser } = useContext(AppContext);
  const { isEnrollmentActive, loading: isEnrollmentActiveLoading } = useGetEnrollmentStatus(courseMetaData?.course_id);

  const handleRedirectToLearning = (url) => {
    if (isEnrollmentActiveLoading || !authenticatedUser) {
      return null;
    }

    if (isEnrollmentActive && !hasPreReqCourse && !isCourseNotStarted) {
      window.location.href = url;
      return null;
    }

    return null;
  };

  return (
    <div className="d-flex flex-column mb-3">
      <div className="d-flex align-items-center mb-3">
        <IconButton
          onClick={() => setOpen(!open)}
          className={classNames('collapsible-btn mr-3', {
            'collapsible-btn-open': open,
          })}
          src={open ? Minus : Plus}
          iconAs={Icon}
          alt="Minus"
          variant="light"
        />
        {loading ? (
          <Skeleton width={120} height={24} />
        ) : (
          <h3>{section.name}</h3>
        )}
      </div>
      <div
        className={classNames('d-flex flex-column collapsible-wrapper', {
          'collapsible-open': !open,
        })}
      >
        {loading ? (
          <Collapsible
            title={(
              <p className="d-flex justify-content-between w-100 ">
                <Skeleton width={120} height={24} />
                <Skeleton width={120} height={24} />
              </p>
            )}
          />
        ) : (
          section?.subsections.map((subsection) => (
            <Collapsible
              key={subsection?.lms_url}
              className="mb-1"
              title={(
                <p className="d-flex justify-content-between w-100 subsection-wrapper">
                  <span>{subsection?.name}</span>{' '}
                  <p className="count-title">
                    <span>{subsection?.units?.length}</span>{' '}
                    <span>
                      <FormattedMessage
                        id="courseInfo.lectures.text"
                        defaultMessage="lectures"
                      />
                    </span>
                  </p>
                </p>
              )}
            >
              {subsection?.units?.map((unit) => (
                <Button
                  key={unit?.lms_url}
                  className={classNames('d-flex unit-btn transform-rtl', {
                    'remove-pointer': warningComponent || !isEnrollmentActive,
                  })}
                  onClick={() => handleRedirectToLearning(unit?.lms_url)}
                  variant="tertiary"
                  // disabled={warningComponent}
                >
                  <Icon
                    src={unit?.type === 'video' ? PlayCircle : Article}
                    className="mr-1.5"
                  />
                  <span>{unit?.name}</span>
                </Button>
              ))}
            </Collapsible>
          ))
        )}
      </div>
    </div>
  );
};
ChapterCourse.defaultProps = {
  section: PropTypes.shape({
    name: PropTypes.string,
    lms_url: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        lms_url: PropTypes.string,
        subsections: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            lms_url: PropTypes.string,
            units: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string,
                lms_url: PropTypes.string,
                type: PropTypes.string,
              }),
            ),
          }),
        ),
      }),
    ),
  }),
  loading: PropTypes.bool,
  sectionCount: PropTypes.number,
};

ChapterCourse.propTypes = {
  section: [],
  loading: false,
  sectionCount: 0,
};

export default ChapterCourse;
