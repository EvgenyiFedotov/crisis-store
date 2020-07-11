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

firebase.initializeApp({
  apiKey: "AIzaSyAvB979aiTKOhI_ZVwO-Qvt-oSbu7mLxq4",
  authDomain: "crisis-store.firebaseapp.com",
  databaseURL: "https://crisis-store.firebaseio.com",
  storageBucket: "crisis-store.appspot.com",
});

firebase.auth().signInAnonymously();

function App() {
  const [pageActive, setPageActive] = React.useState("main");

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
          All things for you when crisis time.
        </div>

        <div className="top-buttons">
          <button className="sign-in">Sign in</button>
          <button className="sign-up">Sign up</button>
        </div>
      </Page>

      <Page name="about">
        <h2>How it works?</h2>
        <br />
        <styled.List>
          <div>1. You subscribing on our service</div>
          <div>2. We buy things for crisis time</div>
          <div>3. We store things in our warehouse</div>
          <div>
            4. When things need you we will bring to you at a convenient time
          </div>
        </styled.List>
      </Page>

      <Page name="subscribe-list" isVisibleBackground>
        <styled.CardList>
          <SubscribeCard header="LIGHT" coin="25">
            <div>Masks</div>
            <div>Gloves</div>
            <div>Wet wipes</div>
          </SubscribeCard>
          <SubscribeCard header="MIDDLE" coin="35">
            <div>Masks</div>
            <div>Gloves</div>
            <div>Wet wipes</div>
            <div>Sanitizer</div>
            <div>Watter</div>
          </SubscribeCard>
          <SubscribeCard header="HIGH" coin="45">
            <div>Masks</div>
            <div>Gloves</div>
            <div>Wet wipes</div>
            <div>Sanitizer</div>
            <div>Watter</div>
            <div>Canned goods</div>
          </SubscribeCard>
        </styled.CardList>
      </Page>

      <Page name="additional-features">
        <div className="content">
          <h2>Additional features</h2>
          <br />
          <styled.List>
            <div>
              1. After the first month of subscription, you can just store
              things with us (the price of the subscription will decrease)
            </div>
            <div>
              2. When the period of storage of things will end, we will sell
              them and buy new ones for you
            </div>
          </styled.List>
        </div>
      </Page>

      <Page name="feedback" isVisibleBackground>
        <PageFeedback />
      </Page>

      <MobileMenu onActive={setPageActive} />
    </styled.AppContainer>
  );
}

function MobileMenu({ onActive }) {
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
        <h2>Menu</h2>
        <br />
        <styled.MobileMenuItem data-pg-name="main" onClick={clicked}>
          Home
        </styled.MobileMenuItem>
        <styled.MobileMenuItem data-pg-name="about" onClick={clicked}>
          How it work?
        </styled.MobileMenuItem>
        <styled.MobileMenuItem data-pg-name="subscribe-list" onClick={clicked}>
          Subscription list
        </styled.MobileMenuItem>
        <styled.MobileMenuItem
          data-pg-name="additional-features"
          onClick={clicked}
        >
          Additional features
        </styled.MobileMenuItem>
        <styled.MobileMenuItem data-pg-name="feedback" onClick={clicked}>
          Feedback
        </styled.MobileMenuItem>

        <styled.MobileMenuButtons>
          <styled.Button>Sign in</styled.Button>
          <styled.Button type="primary">Sign up</styled.Button>
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
      <h2>Feedback</h2>
      <br />
      <div className="form">
        <input
          placeholder="e-mail or name"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <textarea
          rows={5}
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <button onClick={send} disabled={isPending}>
          {isPending ? "Pending..." : "Send"}
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
          <styled.CardMoneyPer>per month</styled.CardMoneyPer>
        </div>
        <styled.CardProductList>{children}</styled.CardProductList>
      </styled.CardContent>
      <styled.CardButton>Subscribe</styled.CardButton>
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
