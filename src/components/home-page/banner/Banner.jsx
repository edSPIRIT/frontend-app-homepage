/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Icon,
  Image,
  SearchField,
  Skeleton,
  useMediaQuery,
} from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import useGetBanner from '../../../hooks/useGetBanner';
import Highlighted from './Highlighted';
import messages from '../../../messages';
import defaultBanner from '../../../assets/default-banner.png';
import { setSearchModal } from '../../../redux/slice/searchModalSlice';

const Banner = ({ intl }) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const dispatch = useDispatch();
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
          <div
            onClick={() => (isMobile ? dispatch(setSearchModal(true)) : null)}
          >
            <SearchField
              className="hero-search my-4"
              submitButtonLocation="external"
              onSubmit={() => (isMobile ? dispatch(setSearchModal(true)) : null)}
              placeholder={intl.formatMessage(
                messages['header.search.placeholder'],
              )}
              buttonText={intl.formatMessage(messages['search.button.text'])}
            />
          </div>
          <Link className="banner-link mt-4" to="/discover">
            <span className="mr-2">
              <FormattedMessage
                id="banner.exploreNewCourses.text"
                defaultMessage="Explore New Courses"
              />
            </span>
            <Icon src={ArrowForward} />
          </Link>
        </div>
        <div className="img-container ml-4">
          {isLoading ? (
            <Skeleton width={300} height={200} />
          ) : (
            <Image
              className="hero-image"
              src={image ?? defaultBanner}
              alt="banner_image"
            />
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
