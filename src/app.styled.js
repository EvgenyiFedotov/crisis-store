import styled, { css } from "styled-components";
import mainBg2 from "./main-bg-2.jpg";
import mainBg3 from "./main-bg-3.jpg";

export const AppContainer = styled.div`
  height: 100%;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const pageMain = css`
  background: top center url(${mainBg2}) no-repeat;
  background-attachment: fixed;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-family: "Bebas Neue", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 154px;
  color: #14181f;
  font-size: 220px;

  .top-buttons {
    position: absolute;
    top: 0px;
    right: 70px;
    line-height: 24px;
    z-index: 10;

    .sign-in {
      padding: 8px;
      margin-right: 24px;
      border: none;
      outline: none;
      border-radius: 4px;
      background-color: #ffffff15;
      backdrop-filter: blur(8px);
      font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      color: #f7faff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .sign-up {
      padding: 8px;
      border: none;
      outline: none;
      border-radius: 4px;
      background-color: #00968885;
      backdrop-filter: blur(8px);
      font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      color: #f7faff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .app-name__world-1 {
    margin-left: -59px;
  }

  .app-name__world-1__letter-1 {
    color: #c09451;
  }

  .app-name__world-2 {
    margin-left: 33px;
  }

  .app-name__world-2__letter-1 {
    color: #009688;
  }

  .app-name__phrase {
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-size: 20px;
  }
`;

const pageAbout = css`
  font-size: 32px;
  color: #f7faff;
`;

const pageSubscribes = css`
  background: top center url(${mainBg3}) no-repeat;
  background-attachment: fixed;
`;

const pageAdditionalFeatures = css`
  font-size: 32px;
  color: #f7faff;

  .content {
    max-width: 1400px;

    h2 {
      text-align: center;
    }
  }
`;

export const AppPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex: none;
  flex-direction: column;

  &[data-page-name="main"] {
    ${pageMain}
  }

  &[data-page-name="about"] {
    ${pageAbout}
  }

  &[data-page-name="subscribe-list"] {
    ${pageSubscribes}
  }

  &[data-page-name="additional-features"] {
    ${pageAdditionalFeatures}
  }
`;

export const AppPageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #ffffff15;
  backdrop-filter: blur(8px);
`;

export const AppPageContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: none;
  justify-content: left;

  & > * {
    margin-bottom: 16px;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  & > * {
    margin-bottom: 24px;
    margin-left: 12px;
    margin-right: 12px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  border: 1px solid #00000005;
  border-radius: 6px;
  padding: 16px;
  background-color: #14181f;
  backdrop-filter: blur(8px);
  box-shadow: 0px 2px 8px 0 #14181f80;
  color: #f7faff;
  width: 300px;
  height: 500px;
  justify-content: space-between;

  &:hover {
    box-shadow: 0px 2px 10px 0 #14181f;
  }
`;

export const CardHeader = styled.div`
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 32px;
  color: #f7faff;
`;

export const CardContent = styled.div`
  margin: 48px 0;
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const CardMoney = styled.div`
  display: flex;
  flex: none;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  line-height: 24px;
  white-space: nowrap;
  font-size: 70px;
  font-weight: bold;
  color: #009688;

  &::before {
    content: "";
    display: block;
    width: 10%;
    min-width: 10%;
    border-top: 1px solid #009688;
    margin-right: 16px;
    font-size: 16px;
  }

  &::after {
    content: "";
    display: block;
    width: 10%;
    min-width: 10%;
    border-top: 1px solid #009688;
    margin-left: 16px;
  }
`;

export const CardMoneyPer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #009688;
  margin-top: 24px;
  text-align: center;
`;

export const CardProductList = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  font-size: 24px;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 36px;
`;

export const CardButton = styled.button`
  padding: 12px;
  font-size: 18px;
  background-color: #009688;
  border: 1px solid #00968855;
  border-radius: 6px;
  color: #14181f;
  outline: none;
  cursor: pointer;
  font-weight: bold;
`;
