import { Collapsible, Icon, IconButton } from '@edx/paragon';
import { useState } from 'react';
import {
  Minus, Plus, PlayCircle, Article,
} from '@edx/paragon/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ChapterCourse = ({ section }) => {
  const [open, setOpen] = useState(false);

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
        <h3>{section.name}</h3>
      </div>
      <div
        className={classNames('d-flex flex-column collapsible-wrapper', {
          'collapsible-open': !open,
        })}
      >
        {section.subsections.map((subsection) => (
          <Collapsible
            key={subsection.name}
            className="mb-1"
            title={(
              <p className="d-flex justify-content-between w-100">
                <span>{subsection.name}</span>{' '}
                <p className="count-title">
                  <span>{subsection.units.length}</span> <span>lectures</span>
                </p>
              </p>
            )}
          >
            {subsection.units.map((unit) => (
              <div key={unit.name} className="d-flex">
                <Icon src={unit.type === 'video' ? PlayCircle : Article} className="mr-1.5" />
                <span>{unit.name}</span>
              </div>
            ))}
          </Collapsible>
        ))}
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
};

ChapterCourse.propTypes = {
  section: [],
};

export default ChapterCourse;
