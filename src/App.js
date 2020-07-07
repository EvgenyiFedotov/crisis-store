import React from "react";
import "./App.css";
import * as styled from "./app.styled";

function App() {
  return (
    <styled.AppContainer>
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
    </styled.AppContainer>
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

export default App;
