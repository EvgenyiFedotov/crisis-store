import * as React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import i18next from "i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

const useLang = () => queryString.parse(useLocation().search).lang ?? "ru";

export function Lang({ children }) {
  const lang = useLang();
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    i18next
      .init({ lng: lang, resources: { en, ru } })
      .then(() => setInit(true));
  }, [lang]);

  if (init) {
    return <>{children}</>;
  }

  return null;
}
