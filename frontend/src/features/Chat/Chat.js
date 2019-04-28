import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { Button } from '../../components/Button';

import Message from './Message';

const StyledChat = styled.div`
  display: grid;
  grid-template-rows: 50vh auto;
  grid-row-gap: 10px;
`;

const ScrollableMessages = styled.div`
  grid-row-gap: 5px;
  display: grid;
  align-content: start;
  overflow-y: scroll;
`;

const Form = styled.form`
  display: grid;
  textarea {
    text-align: start;
    resize: none;
    font-size: 1.5em;
    padding: 0.25em 0.5em;
  }
`;

@inject('chatStore', 'playerStore')
@observer
export default class Chat extends Component {
  @observable newMessage = '';
  @computed get msgLength() {
    return this.newMessage.length;
  }
  inputRef = React.createRef();
  trackerRef = React.createRef();

  componentDidUpdate() {
    const { current } = this.trackerRef;
    current.scrollTop = current.scrollHeight;
  }

  submitHandler = e => {
    e.preventDefault();
    const { chatStore } = this.props;
    if (this.newMessage.length > 0) {
      chatStore.messages.push({
        id: 3,
        name: this.props.playerStore.name,
        message: this.newMessage
      });
      this.newMessage = '';
      this.inputRef.current.focus();
    }
  };

  inputHandler = e => {
    this.newMessage = e.target.value;
  };

  buttonIsAvailabel = () => 'disabled';

  render() {
    return (
      <StyledChat>
        <ScrollableMessages ref={this.trackerRef}>
          {this.props.chatStore.messages.map(({ name, message }, i) => (
            <Message key={i} name={name} msg={message} />
          ))}
        </ScrollableMessages>
        <Form onSubmit={this.submitHandler}>
          <textarea
            ref={this.inputRef}
            onChange={this.inputHandler}
            value={this.newMessage}
            placeholder='Write a message...'
          />
          <Button primary disabled={!this.msgLength}>
            Send
          </Button>
        </Form>
      </StyledChat>
    );
  }
}
