import {
  Image, SearchField,
} from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import bannerImage from '../../assets/bannerImage.png';
import Highlighted from './Highlighted';

const Banner = () => (
  <section className="hero">
    <div className="row custom-container py-6">
      <div className="col col-7">
        <h1 className="display-1">
          <Highlighted
            text={'edX is where you \n go to learn.'}
            highlight="learn"
          />
        </h1>
        <p className="hero-desc">
          Founded by{' '}
          <a className="banner-link" href="#Harvard">
            Harvard
          </a>{' '}
          and{' '}
          <a className="banner-link" href="#MIT">
            MIT
          </a>
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

      <div className="col col-5 d-flex align-items-center justify-content-center">
        <Image className="hero-image" src={bannerImage} alt="" />
      </div>
    </div>
  </section>
);

export default Banner;
