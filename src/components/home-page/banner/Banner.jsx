import {
  Icon, Image, SearchField, Skeleton,
} from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import useGetBanner from '../../../hooks/useGetBanner';
import Highlighted from './Highlighted';

const Banner = () => {
  const history = useHistory();
  const {
    title, highlightedWord, description, image, loading,
  } = useGetBanner();
  return (
    <section className="hero">
      <div className="row custom-container py-6">
        <div className="col col-7">
          <h1 className="display-1">
            {loading ? (
              <Skeleton />
            ) : (
              <Highlighted text={title} highlight={highlightedWord} />
            )}
          </h1>
          {loading ? (
            <Skeleton count={2} />
          ) : (
            <p className="banner-desc">{description}</p>
          )}
          <SearchField
            className="hero-search my-4"
            submitButtonLocation="external"
            placeholder="What do you want to learn?"
            onSubmit={() => history.push('/search')}
          />
          <Link className="banner-link" to="/discover">
            <span className="mr-2">Explore New Courses</span>
            <Icon src={ArrowForward} />
          </Link>
        </div>

        <div className="col col-5 d-flex align-items-center justify-content-center">
          {loading ? (
            <Skeleton width={300} height={200} />
          ) : (
            <Image className="hero-image" src={image} alt="banner_image" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
