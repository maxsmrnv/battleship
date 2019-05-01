import React from 'react';
import styled from 'styled-components';
import Chat from '../Chat/Chat';
import { Button } from '../../components/Button';
import GameArea from './GameArea';

const Wrapper = styled.section`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 150px 2fr 1fr;
  grid-row-gap: 20px;
  .battle {
    grid-area: battle;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
  }
  .chat {
    border-top: 1px solid black;
    align-self: center;
    grid-area: chat;
  }
  .header {
    grid-area: header;
    justify-self: end;
    align-self: start;
  }

  grid-template-areas:
    'header'
    'battle'
    'chat';
`;

const StyledExit = styled(Button)`
  border: none;
  text-decoration: underline;
`;

class Battle extends React.Component {
  exitHandler = e => {
    e.preventDefault();
    this.props.history.push('/game');
  };

  render() {
    return (
      <Wrapper>
        <div className='header'>
          <StyledExit onClick={this.exitHandler}>Exit game</StyledExit>
        </div>
        <div className='battle'>
          <GameArea />
          <GameArea />
        </div>
        <div className='chat'>
          <Chat />
        </div>
      </Wrapper>
    );
  }
}

export default Battle;
