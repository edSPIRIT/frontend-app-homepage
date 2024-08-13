import { FormattedMessage } from '@edx/frontend-platform/i18n';
import DefaultLogo from '../../../assets/place-holders/NavLogo-placeholder.svg';
import useGetFooters from '../../../hooks/useGetFooters';
import ChooseLanguage from './FooterSection/ChooseLanguage';
import FooterCopyRight from './FooterSection/FooterCopyRight';
import FooterSocialIcons from './FooterSection/FooterSocialIcons';
import { determineDirection } from '../../../utils/determineDirection';

const FooterSection = () => {
  const { footerData } = useGetFooters();
  const description = footerData?.description ?? '';
  const firstChar = description.charAt(0);
  const isRTL = determineDirection(firstChar) === 'rtl';

  const directionStyle = {
    direction: isRTL ? 'rtl' : 'ltr',
  };
  return (
    <footer>
      <div className="custom-container mb-4 pt-5">
        <div className=" footer-wrapper">
          <div className=" footer-desc-wrapper">
            <div className="d-flex flex-column">
              <div className="logo-container mb-4">
                <img
                  className="h-100"
                  src={footerData?.logo ?? DefaultLogo}
                  alt="footer-logo"
                />
              </div>
              <p style={directionStyle}>
                {description}
              </p>
            </div>
          </div>

          {footerData?.links?.sections?.[0]?.section_title && (
            <div className=" footer-col1-wrapper">
              <h5 className="mb-2.5">
                {footerData?.links?.sections[0]?.section_title}
              </h5>
              <ul className="list-unstyled">
                {footerData?.links?.sections[0]?.section_links?.map((nav) => (
                  <li className="mb-2" key={nav.title}>
                    <a className="custom-link" href={nav.link}>
                      <FormattedMessage
                        id={nav.title}
                        defaultMessage={nav.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footerData?.links?.sections?.[1]?.section_title && (
            <div className=" footer-col2-wrapper ">
              <h5 className="mb-2.5">
                {footerData?.links?.sections[1]?.section_title}
              </h5>
              <ul className="list-unstyled">
                {footerData?.links?.sections[1]?.section_links?.map((nav) => (
                  <li className="mb-2" key={nav.title}>
                    <a className="custom-link" href={nav.link}>
                      <FormattedMessage
                        id={nav.title}
                        defaultMessage={nav.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className=" footer-col3-wrapper ">
            <ChooseLanguage />
            <FooterSocialIcons footerData={footerData} />
          </div>
        </div>
      </div>
      <FooterCopyRight />
    </footer>
  );
};

export default FooterSection;
