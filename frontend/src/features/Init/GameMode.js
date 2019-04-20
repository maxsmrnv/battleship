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

  render() {
    return (
      <Wrapper>
        <Button>Game with known player</Button>
        <Button>Game with random player</Button>
        <Button onClick={this.backHandler} primary>
          Back
        </Button>
      </Wrapper>
    );
  }
}

export default GameMode;
