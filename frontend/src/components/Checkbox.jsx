import React from 'react';
import styled from 'styled-components';
import aimSvg from './16329192021580202906.svg';

const Wrapper = styled.label`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: 1px solid black;

  ${HiddenCheckbox}:checked + & {
    background-image: url(${aimSvg});
    background-size: cover;
  }
`;

export const Checkbox = ({ onChange, isChecked, label }) => {
  return (
    <Wrapper>
      <HiddenCheckbox checked={isChecked} onChange={onChange} />
      <StyledCheckbox />
      <span>{label}</span>
    </Wrapper>
  );
};
