import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-row-gap: 20px;
  height: 100vh;
`;

const StyledInput = styled(Input)`
  width: 300px;
`;

const Invite = props => {
  const backHandler = e => {
    e.preventDefault();
    props.history.push(`/mode`);
  };
  const joinHandler = e => {
    e.preventDefault();
    props.history.push(`/game/${props.battleStore.gameUUID}`);
  };

  return (
    <Wrapper>
      <StyledInput
        disabled={true}
        value={`${window.location.origin}/game/${props.battleStore.gameUUID}`}
        placeholder='Write your nickname...'
        error='Please, fill up the form'
      />
      <Button>Copy</Button>
      <Button onClick={joinHandler}>Join</Button>
      <Button onClick={backHandler} primary>
        Back
      </Button>
    </Wrapper>
  );
};

export default inject('battleStore')(observer(Invite));
