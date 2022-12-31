import {
  Image, SearchField,
} from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import useGetBanner from '../../../hooks/useGetBanner';
import Highlighted from './Highlighted';

const Banner = () => {
  const {
    title, highlightedWord, description, image,
  } = useGetBanner();
  return (
    <section className="hero">
      <div className="row custom-container py-6">
        <div className="col col-7">
          <h1 className="display-1">
            <Highlighted
              text={title}
              highlight={highlightedWord}
            />
          </h1>
          <p className="hero-desc">
            {description}
          </p>
          <SearchField
            className="hero-search mb-4"
            submitButtonLocation="external"
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder="What do you want to learn?"
          />
          <div className="hero-link-container">
            <a className="hero-link mr-2" href="#explor">
              Explore New Courses
            </a>
            <ArrowForward className="hero-link-icon" width="20px" height="20x" />
          </div>
        </div>

        <div className="col col-5 d-flex align-items-center justify-content-center">
          <Image className="hero-image" src={image} alt="banner_image" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
