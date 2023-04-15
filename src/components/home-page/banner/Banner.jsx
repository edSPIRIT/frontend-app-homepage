/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  Icon, Image, SearchField, Skeleton,
} from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import useGetBanner from '../../../hooks/useGetBanner';
import Highlighted from './Highlighted';
import messages from '../../../messages';

const Banner = ({ intl }) => {
  const history = useHistory();
  const {
    title, highlightedWord, description, image, isLoading,
  } = useGetBanner();
  return (
    <section className="hero">
      <div className=" custom-container banner-wrapper">
        <div className="text-container">
          <h1 className="display-1">
            {isLoading ? (
              <Skeleton />
            ) : (
              <Highlighted text={title} highlight={highlightedWord} />
            )}
          </h1>
          {isLoading ? (
            <Skeleton count={2} />
          ) : (
            <p className="banner-desc">{description}</p>
          )}
          <SearchField
            className="hero-search my-4"
            submitButtonLocation="external"
            placeholder={intl.formatMessage(messages.bannerSearchPlaceholder)}
            onSubmit={() => history.push('/search')}
          />
          <Link className="banner-link" to="/discover">
            <span className="mr-2">
              <FormattedMessage
                id="bannerExploreNewCourses"
                defaultMessage="Explore New Courses"
                description="link title to discover page on banner"
              />
            </span>
            <Icon src={ArrowForward} />
          </Link>
        </div>
        <div className="img-container ml-4">
          {isLoading ? (
            <Skeleton width={300} height={200} />
          ) : (
            <Image className="hero-image" src={image} alt="banner_image" />
          )}
        </div>
      </div>
    </section>
  );
};

Banner.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Banner);
