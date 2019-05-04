import React from 'react';
import styled from 'styled-components';
import Chat from '../Chat/Chat';
import { Button } from '../../components/Button';
import Board from './BattlePreparation/Board';
import { observer, inject } from 'mobx-react';

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

///for dev only///for dev only///for dev only///for dev only///for dev only
const StyledDebuger = styled(Button)`
  border: 2px solid black;
  color: black;
  background-color: red;
`;
function* screenSeqGen() {
  let index = 0;
  const steps = ['pendingForPlayer', 'preparation', 'battle', 'results'];
  while (true) {
    yield steps[index];
    index = (index + 1) % steps.length;
  }
}
const screenSeq = screenSeqGen();
///for dev only///for dev only///for dev only///for dev only///for dev only

@inject('battleStore')
@observer
class Game extends React.Component {
  exitHandler = e => {
    e.preventDefault();
    this.props.history.push('/mode');
  };

  moveFlowStatus = () => {
    this.props.battleStore.battleFlowStatus = screenSeq.next().value;
  };

  renderBattleScreen = () => {
    const { battleFlowStatus } = this.props.battleStore;
    const screenFlowMap = {
      pendingForPlayer: <h1>pending for player...</h1>,
      preparation: (
        <>
          <Board />{' '}
          <div style={{ display: 'grid', alignContent: 'center' }}>
            <Button primary>Ready</Button>
          </div>
          <h1>Move your ship ...</h1>
        </>
      ),
      battle: <h1>battle screen</h1>,
      results: <h1>%usernam% WINS!</h1>
    };
    return screenFlowMap[battleFlowStatus];
  };

  render() {
    return (
      <Wrapper>
        <div className='header'>
          <StyledExit onClick={this.exitHandler}>Exit game</StyledExit>
          <StyledDebuger onClick={this.moveFlowStatus}>
            next screen
          </StyledDebuger>
        </div>
        <div className='battle'>{this.renderBattleScreen()}</div>
        <div className='chat'>
          <Chat />
        </div>
      </Wrapper>
    );
  }
}

export default Game;
