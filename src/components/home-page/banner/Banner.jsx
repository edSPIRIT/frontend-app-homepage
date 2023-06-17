/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Image, Skeleton } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import {
  FormattedMessage,
} from '@edx/frontend-platform/i18n';
import useGetBanner from '../../../hooks/useGetBanner';
import Highlighted from './Highlighted';
import defaultBanner from '../../../assets/default-banner.png';
import SearchBox from '../../shared/search-header/search-header/SearchBox';

const Banner = () => {
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
          <SearchBox />
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

export default Banner;
