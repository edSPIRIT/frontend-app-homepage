/* eslint-disable react/prop-types */
import { FormattedMessage, injectIntl } from '@edx/frontend-platform/i18n';
import { Skeleton, useMediaQuery } from '@edx/paragon';
import ShowMoreText from 'react-show-more-text';
import { Player, BigPlayButton } from 'video-react';
import messages from '../../../../messages';

const AboutCourse = ({
  courseVideoUrl, aboutCourse, loading, intl,
}) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

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
          <ShowMoreText
            lines={3}
            more={intl.formatMessage(messages['showMore.text'])}
            less={intl.formatMessage(messages['showLess.text'])}
            className="content-css"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent="... "
          >
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: aboutCourse }}
            />
          </ShowMoreText>
          {!isMobile && courseVideoUrl && (
            <div className="mt-4">
              <Player src={courseVideoUrl}>
                <BigPlayButton position="center" />
              </Player>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default injectIntl(AboutCourse);
