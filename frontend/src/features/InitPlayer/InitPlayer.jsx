import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { Input } from '_components/Input';
import { Button } from '_components/Button';
import { useStores } from '_utils';
import { Wrapper } from './style';

export const InitPlayer = observer(({ history }) => {
  const {
    playerStore: { playerName, setName },
  } = useStores();

  const ref = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push('/initgame');
  };

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <form onSubmit={submitHandler}>
      <Wrapper>
        <Input
          ref={ref}
          onChange={inputHandler}
          value={playerName}
          placeholder="Write your nickname..."
          error="Please, fill up the form"
        />
        <Button disabled={!playerName.length} primary>
          Next
        </Button>
      </Wrapper>
    </form>
  );
});
