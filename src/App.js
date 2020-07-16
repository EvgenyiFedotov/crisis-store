import React from "react";
import "./App.css";
import * as styled from "./app.styled";
import {
  RiHome5Line,
  RiBookLine,
  RiCoinsLine,
  RiBearSmileLine,
  RiFeedbackLine,
  RiMenuLine,
} from "react-icons/ri";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import i18next from "i18next";
import { useDetectLang, useLang } from "./lang";

firebase.initializeApp({
  apiKey: "AIzaSyAvB979aiTKOhI_ZVwO-Qvt-oSbu7mLxq4",
  authDomain: "crisis-store.firebaseapp.com",
  databaseURL: "https://crisis-store.firebaseio.com",
  storageBucket: "crisis-store.appspot.com",
});

firebase.auth().signInAnonymously();

function App() {
  const [pageActive, setPageActive] = React.useState("main");
  const lang = useDetectLang();

  const [changeLang] = useLang();

  const langChanged = React.useCallback(
    (event) => changeLang(event.currentTarget.value),
    [changeLang]
  );

  React.useEffect(() => {
    const pages = [
      "main",
      "about",
      "subscribe-list",
      "additional-features",
      "feedback",
    ];

    window.addEventListener(
      "scroll",
      debounce(() => {
        let nextPageName = "main";

        for (let index = 0; index < pages.length; index += 1) {
          const pageName = pages[index];
          const selector = `[data-page-name="${pageName}"]`;
          const pageElement = document.querySelector(selector);
          const windowHeight = window.screen.height;
          const windowHeightQueater = windowHeight / 4;
          const scrollTop = window.scrollY;
          const pageOffsetTopHalf = pageElement.offsetTop - windowHeightQueater;

          if (scrollTop > pageOffsetTopHalf) {
            nextPageName = pageName;
          }
        }
        setPageActive(nextPageName);
      })
    );
  }, []);

  return (
    <styled.AppContainer>
      <styled.Menu>
        <MenuButton
          pageActive={pageActive}
          pageName="main"
          onClick={setPageActive}
        >
          <RiHome5Line />
        </MenuButton>
        <MenuButton
          pageActive={pageActive}
          pageName="about"
          onClick={setPageActive}
        >
          <RiBookLine />
        </MenuButton>
        <MenuButton
          pageActive={pageActive}
          pageName="subscribe-list"
          onClick={setPageActive}
        >
          <RiCoinsLine />
        </MenuButton>
        <MenuButton
          pageActive={pageActive}
          pageName="additional-features"
          onClick={setPageActive}
        >
          <RiBearSmileLine />
        </MenuButton>
        <MenuButton
          pageActive={pageActive}
          pageName="feedback"
          onClick={setPageActive}
        >
          <RiFeedbackLine />
        </MenuButton>
      </styled.Menu>

      <Page name="main" isVisibleBackground>
        <div className="app-name__world-1">
          <span className="app-name__world-1__letter-1">C</span>risis
        </div>
        <div className="app-name__world-2">
          <span className="app-name__world-2__letter-1">s</span>tore
        </div>
        <div className="app-name__phrase">
          {i18next.t("main.phase-under-name")}
        </div>

        <div className="top-buttons">
          <button className="sign-in">{i18next.t("main.sign-in")}</button>
          <button className="sign-up">{i18next.t("main.sign-up")}</button>
        </div>

        <styled.LangButtonWrapper>
          <styled.LangButton value={lang} onChange={langChanged}>
            <option value="ru">Ru</option>
            <option value="en">En</option>
          </styled.LangButton>
        </styled.LangButtonWrapper>
      </Page>

      <Page name="about">
        <h2>{i18next.t("about.header")}</h2>
        <br />
        <styled.List>
          <div>{i18next.t("about.list-item-0")}</div>
          <div>{i18next.t("about.list-item-1")}</div>
          <div>{i18next.t("about.list-item-2")}</div>
          <div>{i18next.t("about.list-item-4")}</div>
        </styled.List>
      </Page>

      <Page name="subscribe-list" isVisibleBackground>
        <styled.CardList>
          <SubscribeCard
            header={i18next.t("subscribe-list.card-0.header")}
            coin="25"
          >
            <div>{i18next.t("subscribe-list.products.masks")}</div>
            <div>{i18next.t("subscribe-list.products.gloves")}</div>
            <div>{i18next.t("subscribe-list.products.wet-wipes")}</div>
            <div>{i18next.t("subscribe-list.products.sanitizer")}</div>
          </SubscribeCard>
          <SubscribeCard
            header={i18next.t("subscribe-list.card-1.header")}
            coin="35"
          >
            <div>
              {i18next.t("subscribe-list.package")} "
              {i18next.t("subscribe-list.card-0.header")}"
            </div>
            <div>+</div>
            <div>{i18next.t("subscribe-list.products.watter")}</div>
            <div>{i18next.t("subscribe-list.products.toilet-paper")}</div>
            <div>{i18next.t("subscribe-list.products.canned-goods")}</div>
          </SubscribeCard>
          <SubscribeCard
            header={i18next.t("subscribe-list.card-2.header")}
            coin="45"
          >
            <div>
              {i18next.t("subscribe-list.package")} "
              {i18next.t("subscribe-list.card-1.header")}"
            </div>
            <div>+</div>
            <div>{i18next.t("subscribe-list.products.buckwheat")}</div>
          </SubscribeCard>
        </styled.CardList>
      </Page>

      <Page name="additional-features">
        <div className="content">
          <h2>{i18next.t("additional-features.header")}</h2>
          <br />
          <styled.List>
            <div>{i18next.t("additional-features.list-item-0")}</div>
            <div>{i18next.t("additional-features.list-item-1")}</div>
          </styled.List>
        </div>
      </Page>

      <Page name="feedback" isVisibleBackground>
        <PageFeedback />
      </Page>

      <MobileMenu
        onActive={setPageActive}
        afterButtons={
          <styled.LangButton value={lang} onChange={langChanged}>
            <option value="ru">Ru</option>
            <option value="en">En</option>
          </styled.LangButton>
        }
      />
    </styled.AppContainer>
  );
}

function MobileMenu({ onActive, afterButtons }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const clicked = React.useCallback(
    (event) => {
      const pageName = event.currentTarget.dataset.pgName;
      const page = document.querySelector(`[data-page-name=${pageName}]`);

      page.scrollIntoView({ behavior: "smooth" });
      setIsVisible(false);

      if (onActive) onActive(pageName);
    },
    [onActive]
  );

  return (
    <>
      <styled.MobileMenuButton onClick={() => setIsVisible((prev) => !prev)}>
        <RiMenuLine />
      </styled.MobileMenuButton>

      <styled.MobileMenu isVisible={isVisible}>
        <h2>{i18next.t("mobile-menu.header")}</h2>
        <br />
        <styled.MobileMenuItem data-pg-name="main" onClick={clicked}>
          {i18next.t("mobile-menu.home")}
        </styled.MobileMenuItem>
        <styled.MobileMenuItem data-pg-name="about" onClick={clicked}>
          {i18next.t("mobile-menu.how-it-work")}
        </styled.MobileMenuItem>
        <styled.MobileMenuItem data-pg-name="subscribe-list" onClick={clicked}>
          {i18next.t("mobile-menu.subscription-list")}
        </styled.MobileMenuItem>
        <styled.MobileMenuItem
          data-pg-name="additional-features"
          onClick={clicked}
        >
          {i18next.t("mobile-menu.additional-features")}
        </styled.MobileMenuItem>
        <styled.MobileMenuItem data-pg-name="feedback" onClick={clicked}>
          {i18next.t("mobile-menu.feedback")}
        </styled.MobileMenuItem>

        <styled.MobileMenuButtons>
          <styled.Button>{i18next.t("mobile-menu.sign-in")}</styled.Button>
          <styled.Button type="primary">
            {i18next.t("mobile-menu.sign-up")}
          </styled.Button>
          {afterButtons}
        </styled.MobileMenuButtons>
      </styled.MobileMenu>
    </>
  );
}

function PageFeedback() {
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  const send = React.useCallback(() => {
    setIsPending(true);
    firebase
      .database()
      .ref(`/feedback/${email}`)
      .set({ text })
      .finally(() => setIsPending(false));
  }, [email, text]);

  return (
    <>
      <h2>{i18next.t("feedback.header")}</h2>
      <br />
      <div className="form">
        <input
          placeholder={i18next.t("feedback.email")}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <textarea
          rows={5}
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <button onClick={send} disabled={isPending}>
          {isPending
            ? i18next.t("feedback.pending")
            : i18next.t("feedback.send")}
        </button>
      </div>
    </>
  );
}

function Page({ name, isVisibleBackground, children, afterContent }) {
  return (
    <styled.AppPage data-page-name={name}>
      <PageBackground isVisible={isVisibleBackground} />

      <styled.AppPageContent>{children}</styled.AppPageContent>

      {afterContent}
    </styled.AppPage>
  );
}

function PageBackground({ isVisible }) {
  if (isVisible) return <styled.AppPageBackground />;
  return null;
}

function SubscribeCard({ header, coin, children }) {
  return (
    <styled.Card>
      <styled.CardHeader>{header}</styled.CardHeader>
      <styled.CardContent>
        <div>
          <styled.CardMoney>{coin} $</styled.CardMoney>
          <styled.CardMoneyPer>
            {i18next.t("subscribe-list.per-month")}
          </styled.CardMoneyPer>
        </div>
        <styled.CardProductList>{children}</styled.CardProductList>
      </styled.CardContent>
      <styled.CardButton>
        {i18next.t("subscribe-list.subscribe")}
      </styled.CardButton>
    </styled.Card>
  );
}

function MenuButton({ pageActive, pageName, children, onClick }) {
  const isActive = pageActive === pageName;

  const clicked = React.useCallback(() => {
    const page = document.querySelector(`[data-page-name=${pageName}]`);

    page.scrollIntoView({ behavior: "smooth" });

    if (onClick) onClick(pageName);
  }, [pageName, onClick]);

  return (
    <styled.MenuButton data-active={isActive} onClick={clicked}>
      {children}
    </styled.MenuButton>
  );
}

function debounce(callback, delay = 200) {
  let id = null;

  const clear = () => {
    if (id) {
      clearTimeout(id);
      id = null;
    }
  };

  return (...args) => {
    clear();

    id = setTimeout(() => {
      callback(...args);
      clear();
    }, delay);
  };
}

export default App;
