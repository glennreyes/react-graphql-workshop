import React from 'react';
import { Loader } from 'react-feather';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinningLoader = styled(Loader)`
  animation: ${rotate} 5s linear infinite;
  color: #333;
`;

const Loading = () => (
  <Wrapper>
    <SpinningLoader />
  </Wrapper>
);

export default Loading;
