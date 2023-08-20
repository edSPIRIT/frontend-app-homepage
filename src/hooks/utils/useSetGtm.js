/* eslint-disable consistent-return */
import { useEffect } from 'react';

const createGtmScript = (gtm) => {
  const gtmScript = document.createElement('script');
  gtmScript.text = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=${gtm?.gtm_auth}&gtm_preview=${gtm?.gtm_env}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtm.gtm_id}');
  `;
  return gtmScript;
};

const createNoscriptElement = (gtm) => {
  const noscriptElement = document.createElement('noscript');
  noscriptElement.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${gtm.gtm_id}&gtm_auth=${gtm?.gtm_auth}&gtm_preview=${gtm?.gtm_env}&gtm_cookies_win=x"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  return noscriptElement;
};

const useSetGtm = (gtm) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (gtm) {
      const gtmScript = createGtmScript(gtm);
      document.head.appendChild(gtmScript);

      const noscriptElement = createNoscriptElement(gtm);
      document.body.insertBefore(noscriptElement, document.body.firstChild);

      // Define cleanup function inside the useEffect hook
      return () => {
        if (document.head.contains(gtmScript)) {
          document.head.removeChild(gtmScript);
        }
        if (document.body.contains(noscriptElement)) {
          document.body.removeChild(noscriptElement);
        }
      };
    }
  }, [gtm]);

  return null; // Since this component doesn't render anything, return null
};

export default useSetGtm;
