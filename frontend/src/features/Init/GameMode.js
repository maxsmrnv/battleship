import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { Button } from '../../components/Button';

const Wrapper = styled.section`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-row-gap: 20px;
  height: 100vh;
`;

@observer
@inject('battleStore', 'playerStore')
class GameMode extends React.Component {
  backHandler = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  knownPlayerHandler = async e => {
    e.preventDefault();
    const { battleStore, playerStore } = this.props;
    await battleStore.startBattle(playerStore.name);
    this.props.history.push('/battle/' + battleStore.battleUUID);
  };

  render() {
    return (
      <Wrapper>
        <Button disabled>Game with known player</Button>
        <Button onClick={this.knownPlayerHandler}>
          Game with random player
        </Button>
        <Button onClick={this.backHandler} primary>
          Back
        </Button>
      </Wrapper>
    );
  }
}

export default GameMode;
