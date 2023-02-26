import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  font-size: 16px;
}
`;

export const StyledApp = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #282c34;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    color: white;
`;

export const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`;
