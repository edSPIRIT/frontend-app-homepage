/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import {
  Card,
  Dropdown,
  Icon,
  IconButton,
  ModalLayer,
  ProgressBar,
  Toast,
  useMediaQuery,
  useToggle,
} from '@edx/paragon';
import React, { useState } from 'react';
import {
  Info, MoreVert, Share, Close, Delete, CheckCircle,
} from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import cardPlaceholder from '../../../assets/card-placeholder.png';

const HorizontalCard = ({ courseInfo }) => {
  const [showToast, setShowToast] = useState(false);
  const queryClient = useQueryClient();
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const deleteEnrollCourse = useMutation({
    mutationFn: (courseId) => getAuthenticatedHttpClient().post(
      `${getConfig().LMS_BASE_URL}/admin-console/api/openedx/api/unenroll/`,
      {
        course_id: courseId,
      },
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['EnrollmentList']);
      setShowToast(true);
    },
  });
  const calcProgress = () => {
    if (courseInfo?.progress?.complete_count > 0) {
      const progress = (courseInfo?.progress?.complete_count
          / (courseInfo?.progress?.complete_count
            + courseInfo?.progress?.incomplete_count))
        * 100;
      return Math.round(progress);
    }
    return 0;
  };
  const courseStatus = () => {
    if (
      courseInfo?.progress?.complete_count > 0
      && courseInfo?.progress?.incomplete_count === 0
    ) {
      return (
        <div className="d-flex align-items-center">
          <Icon className="check-icon mr-2.5" src={CheckCircle} />
          <span className="second-title">Completed</span>
        </div>
      );
    }
    if (courseInfo?.progress?.complete_count === 0) {
      return (
        <div className="d-flex align-items-center">
          <Icon className="info-icon mr-2.5" src={Info} />
          <span className="second-title">Not started yet</span>
        </div>
      );
    }
    return <ProgressBar now={calcProgress()} label={`${calcProgress()}%`} />;
  };
  return (
    <>
      <Toast onClose={() => setShowToast(false)} show={showToast}>
        Course Deleted
      </Toast>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div
          role="dialog"
          aria-label="My dialog"
          className="  bg-white more-modal-items "
        >
          <div className="d-flex close-wrapper justify-content-end py-2 px-4">
            <Icon
              src={Close}
              className=" share-icon"
              onClick={close}
            />
          </div>
          <div className="d-flex flex-column mx-4 color-black">
            <div className="d-flex align-items-center py-2 ">
              <Icon
                src={Share}
                className="mr-2"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://apps.${getConfig().LMS_BASE_URL.replace(
                      'https://',
                      '',
                    )}homepage/course/${courseInfo?.course_metadata?.slug}`,
                  );
                }}
              />
              <span>Share</span>
            </div>
            <div className="d-flex align-items-center py-2 ">
              <Icon
                src={Delete}
                className="mr-2"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://apps.${getConfig().LMS_BASE_URL.replace(
                      'https://',
                      '',
                    )}homepage/course/${courseInfo?.course_metadata?.slug}`,
                  );
                }}
              />
              <span>Unroll</span>
            </div>
          </div>
        </div>
      </ModalLayer>
      {/* <a
        href={`https://apps.${getConfig().LMS_BASE_URL.replace(
          'https://',
          '',
        )}/learning/course/${courseInfo?.course_details?.course_id}/home`}
        target="_blank"
        className="horizontal-card-course"
        rel="noreferrer"
      > */}
      <Card
        className="mb-4 horizontal-card-course"
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        <Card.ImageCap
          src={
            `${getConfig().LMS_BASE_URL}${
              courseInfo?.course_details?.course_image_url
            }` ?? cardPlaceholder
          }
          srcAlt="Card image"
        />
        <Card.Body>
          <Card.Section>
            <div className="d-flex justify-content-between align-items-center mb-1 title-wrapper">
              <h3 className="mr-5 course-title">
                {courseInfo?.course_details?.course_name}
              </h3>
              <div className="more-vert-wrapper m-3" onClick={open}>
                <Icon className="" src={MoreVert} />
              </div>
              <div className="d-flex align-items-center icons-wrapper">
                <Icon
                  src={Share}
                  className="mr-3 share-icon"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://apps.${getConfig().LMS_BASE_URL.replace(
                        'https://',
                        '',
                      )}homepage/course/${courseInfo?.course_metadata?.slug}`,
                    );
                  }}
                />
                <Dropdown
                  className="dropdown-icon"
                  onToggle={(isOpenMore) => setIsOpenDropDown(isOpenMore)}
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
                      onClick={() => {
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
            </div>
            <Link
              className="mb-3.5 org-title"
              to={`/partners/${courseInfo?.organization?.short_name}`}
            >
              {courseInfo?.organization?.name}
            </Link>
            <p className="course-date-title">
              <span>Course Start - </span>
              <span>
                {new Date(
                  courseInfo?.course_details?.course_start,
                ).toLocaleString('en-US')}
              </span>
            </p>
            <div className="d-flex align-items-center justify-content-between">
              {courseStatus()}
              <div className="d-flex view-course-btn">
                <a
                  target="_blank"
                  href={`https://apps.${getConfig().LMS_BASE_URL.replace(
                    'https://',
                    '',
                  )}/learning/course/${
                    courseInfo?.course_details?.course_id
                  }/home`}
                  rel="noreferrer"
                  className="view-btn"
                >
                  View Course
                </a>
              </div>
            </div>
          </Card.Section>
        </Card.Body>
      </Card>
      {/* </a> */}
    </>
  );
};
HorizontalCard.propTypes = {
  courseInfo: {
    created: PropTypes.string,
    mode: PropTypes.string,
    is_active: PropTypes.bool,
    course_details: PropTypes.shape({
      course_id: PropTypes.string,
      course_name: PropTypes.string,
      enrollment_start: PropTypes.string,
      enrollment_end: PropTypes.string,
      course_start: PropTypes.string,
      course_end: PropTypes.string,
      invite_only: PropTypes.bool,
      course_modes: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string,
          name: PropTypes.string,
          min_price: PropTypes.number,
          suggested_prices: PropTypes.string,
          currency: PropTypes.string,
          expiration_datetime: PropTypes.string,
          description: PropTypes.string,
          sku: PropTypes.string,
          bulk_sku: PropTypes.string,
        }),
      ),
      pacing_type: PropTypes.string,
      banner_image_url: PropTypes.string,
      course_image_url: PropTypes.string,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string,
      short_name: PropTypes.string,
    }),
    progress: PropTypes.shape({
      complete_count: PropTypes.number,
      incomplete_count: PropTypes.number,
      locked_count: PropTypes.number,
    }),
    course_metadata: PropTypes.shape({
      slug: PropTypes.string,
    }),
    user: PropTypes.string,
  },
};
HorizontalCard.defaultProps = {
  courseInfo: undefined,
};
export default HorizontalCard;
