import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

@inject('playerStore')
@observer
class InitPlayer extends React.Component {
  @observable playerName = this.props.playerStore.name;

  submitHandler = e => {
    e.preventDefault();
    const { history, playerStore } = this.props;
    history.push('game');
    playerStore.name = this.playerName;
  };

  inputHandler = e => {
    this.playerName = e.target.value;
  };

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.submitHandler}>
          <Input
            onChange={this.inputHandler}
            value={this.playerName}
            placeholder='Write your nickname...'
          />
          <Button primary>Let's next</Button>
        </form>
      </Wrapper>
    );
  }
}

export default InitPlayer;
