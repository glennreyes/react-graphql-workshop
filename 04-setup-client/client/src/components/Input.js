import styled from 'styled-components';

const Input = styled.input`
  background: ${p => (p.primary ? '#f1f1f1' : '#fff')};
  border: ${p => (p.primary ? 'none' : '1px solid #000')};
  border-radius: 24px;
  color: #000;
  font-size: ${p => (p.big ? '32px' : '16px')};
  font-weight: ${p => (p.big ? '900' : '400')};
  height: 48px;
  margin-right: 16px;
  outline: none;
  padding: 16px;
  width: 100%;
`;

export default Input;
