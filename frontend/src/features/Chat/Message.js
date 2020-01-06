import React from 'react';
import styled from 'styled-components';

export default function Message(props) {
  const Wrapper = styled.div`
    div {
      min-width: 0;
      min-height: 0;
      word-wrap: break-word;
      word-break: break-all;
      max-width: 100%;
    }
  `;

  const { msg, name } = props;
  return (
    <Wrapper>
      <div>
        <b>{name}:</b>
      </div>
      <div>{msg}</div>
    </Wrapper>
  );
}
