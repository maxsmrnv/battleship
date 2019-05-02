import React, { Component } from 'react';

import styled from 'styled-components';
const WrappedArea = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(20px, 45px));
  grid-template-rows: repeat(10, minmax(20px, 45px));
  border-top: 1px solid black;
  border-right: 1px solid black;
  width: fit-content;
  height: fit-content;
`;

const WrappedAtom = styled.div`
  display: grid;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
`;

export default class GameArea extends Component {
  render() {
    return (
      <>
        <WrappedArea>
          {Array.from(Array(100).keys()).map((el,i) => (
            <WrappedAtom key={i}/>
          ))}
        </WrappedArea>
      </>
    );
  }
}
