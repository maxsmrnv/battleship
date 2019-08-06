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
@inject('battleStore')
class GameMode extends React.Component {
  backHandler = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  randomPlayerHandler = async e => {
    const { battleStore } = this.props;
    await battleStore.startBattle();
    if (battleStore.gameUUID) {
      this.props.history.push('/game/' + battleStore.gameUUID);
    }
  };

  knownPlayerHandler = async e => {
    const { battleStore } = this.props;
    await battleStore.startBattle();
    if (battleStore.gameUUID) {
      this.props.history.push('/invite');
    }
  };

  render() {
    return (
      <Wrapper>
        <Button onClick={this.knownPlayerHandler}>
          Game with known player
        </Button>
        <Button onClick={this.randomPlayerHandler}>
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
