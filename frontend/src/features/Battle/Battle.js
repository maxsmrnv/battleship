import React from 'react';
import styled from 'styled-components';
import Chat from '../Chat/Chat';
import { Button } from '../../components/Button';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 4fr minmax(300px, 1fr);
  grid-template-rows: 50px auto;
  grid-row-gap: 20px;
  .battle {
    grid-area: battle;
  }
  .chat {
    grid-area: chat;
  }
  .header {
    grid-area: header;
    justify-self: center;
    align-self: center;
  }
  grid-template-areas:
    'battle header'
    'battle chat';
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
          <StyledExit onClick={this.exitHandler}>
            Exit game
          </StyledExit>
        </div>
        <div className='battle' />
        <div className='chat'>
          <Chat />
        </div>
      </Wrapper>
    );
  }
}

export default Battle;
