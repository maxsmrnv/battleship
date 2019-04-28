import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.primary ? 'black' : 'white')};
  color: ${props => (props.primary ? 'white' : 'black')};
  border: 1px solid ${props => (props.primary ? 'white' : 'black')};

  font-size: 1.5em;
  padding: 0.25em 1em;
  border: 1px solid black;

  :disabled {
    opacity: 0.3;
  }
  :hover {
    cursor: pointer;
  }
`;
