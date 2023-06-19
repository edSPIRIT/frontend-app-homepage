/* eslint-disable react/prop-types */
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { Dropdown, useMediaQuery } from '@edx/paragon';
import { ArrowDropDown } from '@edx/paragon/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-scroll';
import Scrollspy from 'react-scrollspy';
import messages from '../../../../messages';

const CourseNavItems = ({ isTopOnScreen, loading, intl }) => {
  const isTablet = useMediaQuery({ maxWidth: '1100px' });
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <div
      className={classNames(
        'sticky-nav-wrapper sticky-nav-wrapper-infinite-border d-flex',
        {
          'sticky-nav': !isTopOnScreen && !loading,
        },
      )}
    >
      <Scrollspy
        items={[
          'about-course',
          'what-you-learn',
          'requirement',
          'course-content',
          'instructors',
        ]}
        currentClassName="active-item"
        offset={-160}
      >
        <li>
          <Link
            to="about-course"
            smooth
            offset={-120}
            onClick={(e) => setSelectedItem(e.target.innerText)}
          >
            <FormattedMessage
              id="courseInfo.tab.about.text"
              defaultMessage="About"
            />
          </Link>
        </li>
        <li>
          <Link
            to="what-you-learn"
            smooth
            offset={-40}
            onClick={(e) => setSelectedItem(e.target.innerText)}
          >
            <FormattedMessage
              id="courseInfo.tab.whatYouWillLearn.text"
              defaultMessage="What you'll learn"
            />
          </Link>
        </li>

        <li>
          <Link
            to="requirement"
            smooth
            offset={-120}
            onClick={(e) => setSelectedItem(e.target.innerText)}
          >
            <FormattedMessage
              id="courseInfo.tab.requirements.text"
              defaultMessage="Requirements"
            />
          </Link>
        </li>
        { !isTablet && (
        <li>
          <Link
            to="course-content"
            smooth
            offset={-160}
            onClick={(e) => setSelectedItem(e.target.innerText)}
          >
            <FormattedMessage
              id="courseInfo.tab.courseContent.text"
              defaultMessage="Course content"
            />
          </Link>
        </li>
        )}
        { !isTablet && (
        <li>
          <Link
            to="instructors"
            smooth
            offset={-160}
            onClick={(e) => setSelectedItem(e.target.innerText)}
          >
            <FormattedMessage
              id="courseInfo.tab.instructors.text"
              defaultMessage="Instructors"
            />
          </Link>
        </li>
        )}
        { isTablet && (
        <li className="p-0 dropdown-course-nav-container">
          <div className="facets-wrapper">
            <Dropdown
              autoClose="outside"
              className="facet-btn mr-3 bg-light-300 dropdown-wrapper dropdown-course-nav"
              key="subject"
            >
              <Dropdown.Toggle
                id="{title}-{variant}"
                variant="outline-primary"
                className="font-weight-bold"
                iconAfter={ArrowDropDown}
              />
              <Dropdown.Menu className="facet-menu">
                <Link to="course-content" smooth offset={-140}>
                  <Dropdown.Item
                    key={intl.formatMessage(
                      messages['courseInfo.tab.courseContent.text'],
                    )}
                    active={
                      selectedItem
                      === intl.formatMessage(
                        messages['courseInfo.tab.courseContent.text'],
                      )
                    }
                    onClick={(e) => setSelectedItem(e.target.innerText)}
                  >
                    {intl.formatMessage(
                      messages['courseInfo.tab.courseContent.text'],
                    )}
                  </Dropdown.Item>
                </Link>
                <Link to="instructors" smooth offset={-160}>
                  <Dropdown.Item
                    key={intl.formatMessage(
                      messages['courseInfo.tab.instructors.text'],
                    )}
                    active={
                      selectedItem
                      === intl.formatMessage(
                        messages['courseInfo.tab.instructors.text'],
                      )
                    }
                    onClick={(e) => setSelectedItem(e.target.innerText)}
                  >
                    {intl.formatMessage(
                      messages['courseInfo.tab.instructors.text'],
                    )}
                  </Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
        )}
      </Scrollspy>

    </div>
  );
};

CourseNavItems.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseNavItems);
