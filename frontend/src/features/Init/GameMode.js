import React from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

class GameMode extends React.Component {
  backHandler = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  knownPlayerHandler = e => {
    e.preventDefault();
    this.props.history.push('/battle');
  };

  render() {
    return (
      <Wrapper>
        <Button onClick={this.knownPlayerHandler}>
          Game with known player
        </Button>
        <Button>Game with random player</Button>
        <Button onClick={this.backHandler} primary>
          Back
        </Button>
      </Wrapper>
    );
  }
}

export default GameMode;
