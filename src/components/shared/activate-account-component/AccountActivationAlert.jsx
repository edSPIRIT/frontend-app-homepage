import { Alert } from '@edx/paragon';
import { WarningFilled } from '@edx/paragon/icons';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import sendAccountActivationEmail from '../../../utils/sendActivateEmail';
import useGetUserProfile from '../../../hooks/useGetUserProfile';

const AccountActivationAlert = ({ intl }) => {
  const { userProfile, loading: userProfileLoading } = useGetUserProfile();
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
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!userProfileLoading && !userProfile.is_active && (
        <div className="mt-3">
          <Alert
            variant="warning"
            icon={WarningFilled}
          >
            <Alert.Heading>
              <FormattedMessage
                id="overview.activateYourAccount.heading"
                defaultMessage="Activate Your Account"
              />
            </Alert.Heading>
            <p className="mt-3">
              <FormattedMessage
                id="overview.activateYourAccount.body"
                defaultMessage="To unlock the full potential of your account and access all features, please click on the activation link sent to your email and activate your account now."
              />
            </p>
            <p className="mt-3">
              <FormattedMessage
                id="overview.activateYourAccount.didNotGetEmail"
                defaultMessage="Didn't get the email? {resendActivationEmail}"
                values={{ resendActivationEmail: resendActivationEmailText }}
              />
            </p>
          </Alert>
        </div>
      )}
    </>
  );
};

AccountActivationAlert.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AccountActivationAlert);
