import {
  breakpoints,
  Container,
  Image,
  SearchField,
  useMediaQuery,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { ArrowForward } from '@edx/paragon/icons';
import bannerImage from '../../assets/bannerImage.png';
import { Highlighted } from '../helperComponents';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: breakpoints.large.minWidth });
  return isDesktop ? children : null;
};
Desktop.propTypes = {
  children: PropTypes.shape({
    props: PropTypes.shape({
      alt: PropTypes.string,
    }),
  }).isRequired,
};
const Banner = () => {
  const alt = '';

  return (
    <section className="hero px-1 mb-6">
      <Container size="lg" className="page-width hero__content">
        <div>
          <h1 className="display-1">
            <Highlighted
              text={'edX is where you \n go to learn.'}
              highlight="learn"
            />
          </h1>
          <p className="hero-desc">
            Founded by <a href="#Harvard">Harvard</a> and <a href="#MIT">MIT</a>
            , edX is home to more than 20 million learners, the majority of
            top-ranked universities in the world and industry-leading companies.
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
        <div>
          <Desktop>
            <Image
              className="hero__image mt-6"
              // srcSet={`${LargeHeroImageLoRes} 1000w, ${LargeHeroImageHiRes} 2000w`}
              src={bannerImage}
              alt={alt}
              sizes="33vw"
            />
          </Desktop>
          {/* <Tablet>
            <LargeImage alt={alt} />
          </Tablet> */}
        </div>
      </Container>
    </section>
  );
};

Banner.defaultProps = {};

Banner.propTypes = {};

export default Banner;
