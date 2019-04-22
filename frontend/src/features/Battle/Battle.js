import React from 'react';
import styled from 'styled-components';
import Chat from '../Chat/Chat';

const Wrapper = styled.section`
  display: grid;
  height: 100vh;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    'game'
    'chat';
`;

class Battle extends React.Component {
  render() {
    return (
      <Wrapper>
        <div className='game'>game area</div>
        <div className='chat'>
          <Chat />
        </div>
      </Wrapper>
    );
  }
}

export default Battle;
