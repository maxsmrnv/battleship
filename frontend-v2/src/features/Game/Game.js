import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router';

export const Game = observer(() => {
  const { gameUUID } = useParams();

  useEffect(() => {
    console.log('connect to socket with gameUUID:', gameUUID);
  });

  return (
    <>
      <h1>GAME {gameUUID}</h1>
    </>
  );
});
