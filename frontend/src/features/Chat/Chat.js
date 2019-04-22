import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

const StyledChat = styled.div`
  border-top: solid 1px black;
  height: 100%;
  width: 100%;
`;

@inject('chatStore')
export default class Chat extends Component {
  render() {
    return (
      <StyledChat>
        <ul>
          {this.props.chatStore.messages.map(({ id, name, message }) => (
            <div key={id}>{`${name}: ${message}`}</div>
          ))}
        </ul>
      </StyledChat>
    );
  }
}
