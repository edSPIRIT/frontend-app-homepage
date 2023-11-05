/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Button, Skeleton, useMediaQuery } from '@edx/paragon';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import messages from '../../../../messages';

const AboutCourse = ({
  courseVideoUrl, aboutCourse, loading, intl,
}) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      if (height > 99) {
        setShow(true);
      }
    }
  }, [aboutCourse]);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const displayButtonContent = () => {
    if (!show) {
      return null;
    }
    if (isOpen) {
      return intl.formatMessage(messages['showLess.text']);
    }
    return intl.formatMessage(messages['showMore.text']);
  };
  return (
    <div className="about-wrapper" id="about-course">
      <h2 className="mb-3">
        <FormattedMessage
          id="courseInfo.aboutThisCourse.text"
          defaultMessage="About this course"
        />
      </h2>
      {loading ? (
        <Skeleton count={4} height={24} />
      ) : (
        <>
          <div
            className={classNames('', {
              'about-content-wrapper': show && !isOpen,
            })}
            ref={contentRef}
            style={{
              maxHeight: isOpen ? 'none' : '100px',
              overflow: 'hidden',
              background:
                'linear-gradient(to bottom, #ffffff 0%, transparent 100%)',
            }}
          >
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: aboutCourse }}
            />
          </div>
          <Button variant="tertiary" onClick={toggle}>
            {displayButtonContent()}
          </Button>
          {!isMobile && courseVideoUrl && (
            <div className="mt-4 player-wrapper">
              <ReactPlayer
                controls
                url={courseVideoUrl}
                style={{ position: 'absolute', top: '0', left: '0' }}
                width="100%"
                height="100%"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default injectIntl(AboutCourse);
