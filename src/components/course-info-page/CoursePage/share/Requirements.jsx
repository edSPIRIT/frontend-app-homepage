/* eslint-disable react/prop-types */
import {
  Button, Card, Icon, Skeleton,
} from '@edx/paragon';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ReactComponent as Warning } from '../../../../assets/warning.svg';
import logoPlaceholder from '../../../../assets/place-holders/org-place-holder.svg';
import coverPlaceholder from '../../../../assets/place-holders/cover-course-place-holder.svg';

const Requirements = ({ courseMetaData, loading }) => {
  const history = useHistory();
  return (
    <div className="requirements-wrapper" id="requirement">
      <h2 className="mb-3">
        <FormattedMessage
          id="courseInfo.tab.requirements.text"
          defaultMessage="Requirements"
        />
      </h2>
      {loading ? (
        <div className="mb-4.5">
          <Skeleton count={2} height={24} />
        </div>
      ) : (
        <ul className="pl-3.5 pb-0">
          {courseMetaData?.requirements
            && courseMetaData?.requirements?.map((req, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i} className="mb-3">
                <p>{req}</p>
              </li>
            ))}
        </ul>
      )}
      {courseMetaData?.additional_metadata?.pre_req_courses?.length > 0 && (
        <div>
          <h3 className="mb-3">
            <FormattedMessage
              id="courseInfo.prerequisiteCourse.text"
              defaultMessage="Prerequisite Course"
            />
          </h3>
          <div className="attention-wrapper mb-4">
            <div className="d-flex align-items-center mb-2">
              <Icon className="mr-1" src={Warning} />
              <h4>
                <FormattedMessage
                  id="courseInfo.attention.text"
                  defaultMessage="Attention!"
                />
              </h4>
            </div>
            {loading ? (
              <Skeleton height={24} />
            ) : (
              <p className="font-sm ml-4">
                <FormattedMessage
                  id="courseInfo.prerequisiteDesc.text"
                  defaultMessage="This course has a prerequisite that must be successfully
                completed before you enroll."
                />
              </p>
            )}
          </div>
          <div className="prerequisite-courses-wrapper">
            {loading
              ? Array(3)
                .fill(1)
                .map((item, i) => (
                  <div
                    className="d-flex flex-column skeleton-wrapper"
                      // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    <Skeleton className="mb-2" height={92} />
                    <div className="skeleton-logo" />
                    <div className="p-4">
                      <Skeleton className="mb-1" width="60%" height={24} />
                      <Skeleton width="60%" height={24} />
                      <Skeleton
                        className="mt-4.5"
                        borderRadius={4}
                        height={44}
                      />
                    </div>
                  </div>
                ))
              : courseMetaData?.additional_metadata?.pre_req_courses?.map(
                (preCourse) => (
                  <Link
                    to={`/course/${preCourse?.course_slug}`}
                    key={preCourse.id}
                  >
                    <Card className="cards-wrapper">
                      <Card.ImageCap
                        src={preCourse.cover ?? coverPlaceholder}
                        logoSrc={
                            preCourse?.partner?.organization?.logo
                            ?? logoPlaceholder
                          }
                        variant="top"
                        alt="logo"
                        fallbackSrc={coverPlaceholder}
                        fallbackLogoSrc={logoPlaceholder}
                        // imageLoadingType="lazy"
                      />
                      <div className="my-4.5 px-4">
                        <h4 className="mb-1 course-title">
                          {preCourse?.display_name}
                        </h4>
                        <Link
                          className="institution-title font-sm"
                          to={`/partners/${preCourse?.partner?.organization?.short_name}`}
                        >
                          {preCourse?.partner?.organization?.name}
                        </Link>
                      </div>
                      <Card.Footer>
                        <Button
                          variant="primary"
                          onClick={() => history.push(preCourse?.course_slug)}
                        >
                          <FormattedMessage
                            id="courseCard.learnMore.button"
                            defaultMessage="Learn More"
                          />
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Link>
                ),
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Requirements;
