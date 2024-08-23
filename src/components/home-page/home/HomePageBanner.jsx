import { Icon, Image, Skeleton } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { FormattedMessage, getLocale } from '@edx/frontend-platform/i18n';
import useGetBanner from '../../../hooks/useGetBanner';
import Highlighted from './HomePageBanner/Highlighted';
import SearchBox from '../../shared/search-header/SearchHeader/SearchBox';
import defaultImage from '../../../assets/place-holders/banner-placeholder.svg';

const HomePageBanner = () => {
  const { bannerData, isLoading } = useGetBanner();
  const currentLang = getLocale();

  const renderTitle = () => {
    if (isLoading) {
      return <Skeleton />;
    }

    return bannerData?.title ? (
      <Highlighted
        text={bannerData.title[currentLang]}
        highlight={bannerData.highlight_word[currentLang]}
      />
    ) : (
      <FormattedMessage
        id="banner.welcomeText"
        defaultMessage="Welcome Text!"
      />
    );
  };
  const renderDescription = () => {
    if (isLoading) {
      return (
        <div className="mb-2">
          <Skeleton count={2} />
        </div>
      );
    }

    return (
      <p className="banner-desc">
        {bannerData?.description[currentLang] || (
          <FormattedMessage
            id="banner.welcomeDesc"
            defaultMessage="Welcome message will be appeared here!"
          />
        )}
      </p>
    );
  };
  return (
    <section className="hero">
      <div className=" custom-container banner-wrapper">
        <div className="text-container">
          <h1 className="display-1">{renderTitle()}</h1>
          {renderDescription()}
          <SearchBox searchBoxClass="banner-search-box" />
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
              src={bannerData?.image ?? defaultImage}
              alt="banner_image"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePageBanner;
