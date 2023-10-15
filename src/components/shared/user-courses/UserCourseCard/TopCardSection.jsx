/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { Icon } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

import { Link } from 'react-router-dom';
import { injectIntl } from '@edx/frontend-platform/i18n';
import { determineDirection } from '../../../../utils/determineDirection';
import CourseDateStatus from './TopCardSection/CourseDateStatus';
import TopIcons from './TopCardSection/TopIcons';
import UnenrollAlert from './TopCardSection/UnenrollAlert';

const TopCardSection = ({ courseInfo, openMoreBtnModal, certificateData }) => (
  <>
    <UnenrollAlert courseId={courseInfo?.course_details?.course_id} />
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

export default injectIntl(TopCardSection);
