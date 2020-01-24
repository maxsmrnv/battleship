import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams, useLocation } from 'react-router';
import styled from 'styled-components';
import { useStores } from '../../utils';
import { reaction } from 'mobx';

export const Cell = styled.div`
  width: 50px;
  height: 50px;
  border-left: 1px solid black;
  border-top: 1px solid black;
  background-color: ${({ isShip }) => (isShip ? 'black' : 'white')};
`;

const HitShot = styled.div`
  width: ${50 * Math.sqrt(2)}px;
  height: ${50 * Math.sqrt(2)}px;
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &::before {
    border-right: 2px solid grey;
    transform: rotate(45deg) translate(-50px, 0);
  }
  &::after {
    border-bottom: 2px solid grey;
    transform: rotate(45deg) translate(-15px, -35px);
  }
`;

const MissShot = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    border-radius: 50%;
    content: '';
    width: 20px;
    height: 20px;
    background-color: black;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

export const Area = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  width: fit-content;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;

const Overlay = styled.div`
  opacity: 0.3;
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: grey; /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other */
`;

export const Game = observer(() => {
  const {
    battleStore: {
      createConnection,
      sendMessage,
      wsIsAvailable,
      enemyShips,
      playerShips,
      yourMove
    },
    shipsStore: { transformToGameView }
  } = useStores();
  useEffect(() => {
    createConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('enemyShips', enemyShips);
    console.log('playerShips', playerShips);
  }, [enemyShips, playerShips]);

  useEffect(() => {
    console.log('wsIsAvailable', wsIsAvailable);
    wsIsAvailable && sendMessage({ ships: transformToGameView });
  }, [sendMessage, transformToGameView, wsIsAvailable]);

  const handleShot = i => e => {
    e.stopPropagation();
    sendMessage({ shot: i });
  };

  const renderCell = (i, ship, handler) => {
    return (
      <Cell key={i} isShip={ship === 'ship'} onClick={handler && handleShot(i)}>
        {ship === 'hit' && <HitShot />}
        {ship === 'miss' && <MissShot />}
      </Cell>
    );
  };

  return (
    <Wrapper>
      <h3>enemy ships</h3>
      <Area>
        {enemyShips.map((ship, idx) => renderCell(idx, ship, handleShot))}
      </Area>
      <h3>your ships</h3>
      <Area>{playerShips.map((ship, idx) => renderCell(idx, ship))}</Area>
      {!yourMove && <Overlay />}
    </Wrapper>
  );
});
