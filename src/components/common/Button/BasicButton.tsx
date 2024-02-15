"use client";
import styled from "styled-components";
import { GlobalPrimary } from "../../../../build/js/tokens";

type Props = {
  text: string;
};

export const BasicButton = ({ text }: Props) => {
  return (
    <ButtonStyle>
      <button>{text}</button>
    </ButtonStyle>
    // <button className="basic-button">{text}</button>
  );
};

const ButtonStyle = styled.div`
  > button {
    background-color: ${GlobalPrimary};
    border-radius: 50px;
    padding: 10px 20px;
  }
`;
