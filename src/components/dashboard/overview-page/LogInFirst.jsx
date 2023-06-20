import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import handleRedirect from '../../../utils/handleRedirect';
import loginImage from '../../../assets/card-image-cap.png';

const LogInFirst = () => (
  <div className="login-wrapper d-flex flex-column justify-content-center align-items-center pb-4">
    <div className="pb-4">
      <img src={loginImage} alt="login-img" />
    </div>
    <span className="text-primary-700">
      <FormattedMessage id="overView.please.text" defaultMessage="please" />
      <p className="pl-1">
        <Button
          variant="link"
          onClick={handleRedirect}
          className="p-1 text-brand-500 font-weight-bold"
        >
          <FormattedMessage id="overView.logIn.text" defaultMessage="log in" />
        </Button>
        <FormattedMessage
          id="overView.toAccessYourDashboard.text"
          defaultMessage="to access your dashboard"
        />
      </p>
    </span>
  </div>
);

export default LogInFirst;
