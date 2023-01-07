import { Button, Card, Image } from '@edx/paragon';
import React from 'react';
import Highlighted from '../../home-page/banner/Highlighted';
import adImg from '../../../assets/ad-img2.png';

const AdCard = () => (
  <aside>
    <Card style={{ width: '100%' }} className="ad-card-wrapper">
      <div className="banner-wrap position-relative">
        <div className="text-wrapper">
          <div className="highlight-wrapper py-3 pl-3.5">
            <h2 className="highlightd-ad">
              <Highlighted
                text="Join the millions learning on edX"
                highlight="Join the millions"
              />
            </h2>
          </div>
          <div className="img-wrapper d-flex align-items-center justify-content-center">
            <Image className="hero-image" src={adImg} alt="ad_image" />
          </div>
        </div>
      </div>
      <Card.Section>
        Composable region
      </Card.Section>
      <Card.Footer>
        <Button variant="brand">Primary action</Button>
      </Card.Footer>
    </Card>
  </aside>
);

export default AdCard;
