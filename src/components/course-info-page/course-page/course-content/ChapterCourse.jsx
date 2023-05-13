import {
  Collapsible, Icon, IconButton, Skeleton,
} from '@edx/paragon';
import { useState } from 'react';
import {
  Minus, Plus, PlayCircle, Article,
} from '@edx/paragon/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

const ChapterCourse = ({ section, loading, sectionCount }) => {
  const [open, setOpen] = useState(!(sectionCount > 1));

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
          section.subsections.map((subsection) => (
            <Collapsible
              key={subsection.name}
              className="mb-1"
              title={(
                <p className="d-flex justify-content-between w-100 subsection-wrapper">
                  <span>{subsection.name}</span>{' '}
                  <p className="count-title">
                    <span>{subsection.units.length}</span>{' '}
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
              {subsection.units.map((unit) => (
                <div key={unit.name} className="d-flex">
                  <Icon
                    src={unit.type === 'video' ? PlayCircle : Article}
                    className="mr-1.5"
                  />
                  <span>{unit.name}</span>
                </div>
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
