import { useEffect, useContext, useState } from 'react';
import { ActionRow, AlertModal, Button } from '@edx/paragon';
import { AppContext } from '@edx/frontend-platform/react';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import HomePagePartners from './home/HomePagePartners';
import PopularSubjectsWrapper from './home/PopularSubjectsWrapper';
import HomePageBanner from './home/HomePageBanner';
import ExplorerCourses from './home/ExplorerCourses';
import useGetUserProfile from '../../hooks/useGetUserProfile';
import sendAccountActivationEmail from '../../utils/sendActivateEmail';
import useGetConfig from '../../hooks/useGetConfig';
import messages from '../../messages';

const Home = ({ intl }) => {
  const { platformName } = useGetConfig();

  useEffect(() => {
    document.title = `${intl.formatMessage(messages['header.nav.home'])} | ${platformName}`;
  }, [intl, platformName]);

  const { authenticatedUser } = useContext(AppContext);
  const { userProfile, loading: userProfileLoading } = useGetUserProfile();
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    if (!userProfileLoading && !userProfile?.is_active && !sessionStorage.getItem('showActivateModal')) {
      setShowAlertModal(true);
    }
  }, [userProfileLoading, userProfile?.is_active, platformName]);

  const handleCloseNotActivatedModal = () => {
    sessionStorage.setItem('showActivateModal', 'false');
    setShowAlertModal(false);
  };
  const resendActivationEmailText = (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        sendAccountActivationEmail();
      }}
    >
      {intl.formatMessage({ id: 'overview.activateYourAccount.resendEmail', defaultMessage: 'Resend Activation Email' })}
    </a>
  );

  const renderAlertModal = () => {
    if (!authenticatedUser) {
      return null;
    } if (showAlertModal) {
      return (
        <AlertModal
          title={
              intl.formatMessage({ id: 'home.activateYourAccount.title', defaultMessage: 'Resend Activation Email' })
            }
          isOpen
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={handleCloseNotActivatedModal}>
                <FormattedMessage id="home.activateYourAccount.close" defaultMessage="Close" />
              </Button>
            </ActionRow>
            )}
        >
          <p>
            <FormattedMessage
              id="home.activateYourAccount.text"
              defaultMessage="Welcome! To unlock the full potential of your account and access all features, please click on the activation link sent to your email and activate your account now."
            />
          </p>
          <p className="mt-3">
            <FormattedMessage
              id="overview.activateYourAccount.didNotGetEmail"
              defaultMessage="Didn't get the email? {resendActivationEmail}"
              values={{ resendActivationEmail: resendActivationEmailText }}
            />
          </p>
        </AlertModal>
      );
    }
    return null;
  };

  return (
    <>
      { renderAlertModal()}
      <HomePageBanner />
      <PopularSubjectsWrapper />
      <ExplorerCourses />
      {/* <TopPrograms /> */}
      <HomePagePartners />
    </>
  );
};

Home.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Home);
