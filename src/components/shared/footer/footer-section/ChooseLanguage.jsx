/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Dropdown,
  Icon,
  ModalLayer,
  useMediaQuery,
  useToggle,
} from '@edx/paragon';
import {
  Check, Close, KeyboardArrowDown, Language,
} from '@edx/paragon/icons';
import { useContext, useState } from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedMessage,
  getLocale,
  handleRtl,
} from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import useGetActiveLangs from '../../../../hooks/useGetActiveLangs';
import { supportedLanguages } from '../../../../utils/supportsLanguages';
import handleRedirect from '../../../../utils/handleRedirect';

const ChooseLanguage = () => {
  const { activeLangs } = useGetActiveLangs();
  const getLangName = (languageCode) => {
    const langSelected = supportedLanguages?.find(
      (lang) => lang?.code === languageCode,
    );
    return langSelected?.name;
  };
  const [value, setValue] = useState(getLangName(getLocale()));
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const { authenticatedUser } = useContext(AppContext);
  async function patchPreferences(params) {
    const { status } = await getAuthenticatedHttpClient().patch(
      `${getConfig().LMS_BASE_URL}/api/user/v1/preferences/${
        authenticatedUser?.username
      }`,
      {
        'pref-lang': params,
      },
      {
        headers: { 'Content-Type': 'application/merge-patch+json' },
      },
    );
    if (status === 204) {
      setValue(getLangName(getLocale()));
      window.location.reload();
    }
    return params; // TODO: Once the server returns the updated preferences object, return that.
  }

  // async function postSetLang(code) {
  //   const formData = new FormData();
  //   formData.append('language', code);

  //   await getAuthenticatedHttpClient().post(
  //     `${getConfig().LMS_BASE_URL}/i18n/setlang/`,
  //     formData,
  //     {
  //       headers: { 'X-Requested-With': 'XMLHttpRequest' },
  //     },
  //   );
  // }
  const getLangCode = (languageName) => {
    const langSelected = supportedLanguages?.find(
      (lang) => lang?.name === languageName,
    );
    return langSelected.code;
  };

  const handleClick = (e) => {
    if (!authenticatedUser) {
      const url = new URL(getConfig().LMS_BASE_URL).hostname;
      if (getLocale() !== getLangCode(e.target.innerText)) {
        document.cookie = `openedx-language-preference=${getLangCode(
          e.target.innerText,
        )}; path=/; domain=.${url}`;
        window.location.reload();
      }
    }
    patchPreferences(getLangCode(e.target.innerText));
    // postSetLang(getLangCode(e.target.innerText));
    // publish(LOCALE_CHANGED, getLocale());
    handleRtl();
  };
  return (
    <>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div
          role="dialog"
          aria-label="My dialog"
          className="  bg-white more-modal-items "
        >
          <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
            <span className="font-sm" />
            <Icon src={Close} className=" share-icon" onClick={close} />
          </div>
          <ul className="px-4 font-xl transform-rtl">
            {activeLangs?.map((lang) => (
              <li
                key={lang.code}
                onClick={(e) => {
                  handleClick(e);
                  close();
                }}
                className="d-flex justify-content-between my-2.5"
              >
                <span>{getLangName(lang.code)}</span>
                {value === getLangName(lang.code) && (
                  <Icon className="check-icon" src={Check} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </ModalLayer>
      <>
        <h5 className="mb-2.5">
          <FormattedMessage
            id="footer.chooseLanguage.text"
            defaultMessage="Choose Language"
          />
        </h5>
        <Dropdown
          className="dropdown-wrapper lang-dropdown mb-5.5"
          onSelect={(e) => setValue(e)}
          onClick={isMobile ? open : null}
        >
          <Dropdown.Toggle
            id="dropdown-basic-4"
            iconAfter={KeyboardArrowDown}
            iconBefore={Language}
          >
            <span className="text-primary-500 dropdown-title"> {value}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {activeLangs?.map((lang) => (
              <Dropdown.Item
                key={lang.code}
                active={value === getLangName(lang.code)}
                eventKey={lang.name}
                onClick={handleClick}
              >
                {getLangName(lang.code)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    </>
  );
};

export default ChooseLanguage;
