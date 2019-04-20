import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  background: ${p => (p.primary ? '#000' : '#fff')};
  border: ${p => (p.primary ? 'none' : '1px solid #000')};
  border-radius: 24px;
  color: ${p => (p.primary ? '#fff' : '#000')};
  display: flex;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  line-height: 1;
  outline: none;
  padding: 0 16px;
  transition: 0.4s;

  &:disabled {
    background: #999;
  }
`;

export default Button;
