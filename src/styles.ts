import styled, { keyframes, css } from "styled-components";

export const Container = styled("main")<{ currentColor: number[] }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: rgb(${props => props.currentColor.join(",")});
  padding: 48px 24px;
`;

export const VoteContainer = styled("section")`
  display: flex;
  position: relative;
  background-color: white;
  border-radius: 8px;
`;

export const Button = styled("button")`
  border: none;
  cursor: pointer;
  background: none;
  padding: 24px;
  width: 120px;

  img {
    transition: transform 200ms;
    max-width: 120px;
  }

  :hover {
    img {
      transform: scale(1.15);
    }
  }
`;

export const CheckboxLabel = styled("label")`
  display: block;

  input,
  &:hover {
    cursor: pointer;
  }
`

export const Header = styled("header")`
  font-family: "Roboto", sans-serif;
  text-align: center;
  background-color: white;
  padding: 24px;
  border-radius: 8px;

  h1 {
    color: #181818;
    font-size: 40px;
    font-weight: 400;
    margin: 0 0 24px;
  }

  p,
  a:visited,
  a:focus,
  a:active,
  label {
    color: #6a737d;
    font-size: 14px;
  }

  p,
  label {
    margin: 0 0 12px;
  }

  b {
    color: #181818;
    font-weight: 500;
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
`;

export const GuessIcon = styled("img")<{ percentage: number, isLearning: boolean }>`
  position: absolute;
  width: 32px;
  bottom: -16px;
  transition: margin 200ms;
  margin-left: ${props =>
    props.isLearning
      ? "calc(50% - 16px)"
      : `calc((100% - 32px) * (1 - ${props.percentage}))`};

  ${props =>
    props.isLearning &&
    css`
      animation: ${rotate} 1s infinite;
    `};
`;
