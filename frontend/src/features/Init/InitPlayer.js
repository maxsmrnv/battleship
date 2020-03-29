import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from '../../components/Alert';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 45vh;
`;

const WrappedAlrt = styled(Alert)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

@inject('playerStore')
@observer
class InitPlayer extends React.Component {
  @observable playerName = this.props.playerStore.name;
  @observable nameIsValid = true;

  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  submitHandler = e => {
    e.preventDefault();
    const { history, playerStore } = this.props;
    if (this.playerName.length > 0) {
      history.push('mode');
      playerStore.setName(this.playerName);
    } else {
      this.nameIsValid = false;
    }
  };

  inputHandler = e => {
    this.playerName = e.target.value;
    this.nameIsValid = true;
  };

  renderError = () => {
    return (
      <WrappedAlrt>
        <Alert>Please, fill up the form </Alert>
      </WrappedAlrt>
    );
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <Wrapper>
            <Input
              ref={this.inputRef}
              onChange={this.inputHandler}
              value={this.playerName}
              placeholder="Write your nickname..."
              error="Please, fill up the form"
            />
            <Button primary>Let's next</Button>
          </Wrapper>
          {!this.nameIsValid && this.renderError()}
        </form>
      </>
    );
  }
}

export default InitPlayer;
