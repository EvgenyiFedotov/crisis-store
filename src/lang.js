import * as React from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import i18next from "i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const useQuery = () => {
  const location = useLocation();

  return React.useMemo(() => queryString.parse(location.search), [location]);
};

export const usePathname = () => {
  const { pathname } = useLocation();

  return React.useMemo(() => pathname, [pathname]);
};

export const useDetectLang = () => useQuery().lang ?? "ru";

export const useLang = () => {
  const history = useHistory();
  const pathname = usePathname();
  const query = useQuery();

  const change = React.useCallback(
    (lang = "ru") => {
      const nextQuery = { ...query };

      nextQuery.lang = lang;

      history.push(`${pathname}?${queryString.stringify(nextQuery)}`);
    },
    [pathname, history, query]
  );

  return [change];
};

export function Lang({ children }) {
  const lang = useDetectLang();
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    setInit(false);

    i18next
      .init({ lng: lang, resources: { en, ru } })
      .then(() => setInit(true));
  }, [lang]);

  if (init) {
    return <>{children}</>;
  }

  return null;
}
