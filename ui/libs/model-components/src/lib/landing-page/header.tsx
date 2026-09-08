import styled from '@emotion/styled';

import headerBackground from './assets/header-background.svg';

const HeaderWrapper = styled.header`
  display: flex;
  background: black url(${headerBackground}) right / auto 100% no-repeat;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  padding: 40px 20px;
  position: relative;
  box-sizing: border-box;
`;

const BottomBorder = styled.div`
  width: 100%;
  height: 4px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    #82e1ff 3.18%,
    #78e6a0 31.25%,
    #ffb400 60.58%,
    #ff8700 88.89%
  );
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 930px;
  max-width: 100%;
  gap: 12px;
`;

const HeaderText = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: white;
`;

const Description = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: white;
  margin: 0;
`;

export const Header = () => (
  <HeaderWrapper>
    <TextWrap>
      <HeaderText>Welcome to the KOS Codex</HeaderText>
      <Description>
        Working exemplars of the KOS UI concepts, built with the KOS tooling and
        running against a live backend. Pick a collection to start.
      </Description>
    </TextWrap>
    <BottomBorder />
  </HeaderWrapper>
);
