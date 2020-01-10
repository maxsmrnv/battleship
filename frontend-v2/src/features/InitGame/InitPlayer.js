import React from 'react';
import { observer } from 'mobx-react';

import { useStores } from '../../utils';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Wrapper } from './style';

export const InitPlayer = observer(({ history }) => {
  const {
    playerStore: { playerName, setName }
  } = useStores();

  const submitHandler = e => {
    e.preventDefault();
    history.push('/game');
  };

  const inputHandler = e => {
    setName(e.target.value);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Wrapper>
          <Input
            onChange={inputHandler}
            value={playerName}
            placeholder='Write your nickname...'
            error='Please, fill up the form'
          />
          <Button disabled={!playerName.length} primary>
            Let's next
          </Button>
        </Wrapper>
      </form>
    </>
  );
});
