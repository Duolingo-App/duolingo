"use client";

import { useEffectOnce } from "../hooks/useEffectOnce";

const GoogleTranslator = () => {
  useEffectOnce(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false,
        }, 'google_translate_element');
      }
    `;

    const translateScript = document.createElement("script");
    translateScript.type = "text/javascript";
    translateScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    document.head.appendChild(script);
    document.head.appendChild(translateScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(translateScript);
    };
  });

  return <div className="mx-2 px-2 mt-1 z-10 " id="google_translate_element"></div>;
};

export default GoogleTranslator;