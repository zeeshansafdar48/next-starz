import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const AppContainer = styled.div`
  background-color: #221c35;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`;
