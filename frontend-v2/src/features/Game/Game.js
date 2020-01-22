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

const renderCell = (key, isShip = false, status) => (
  <Cell key={key} isShip={isShip}>
    {status === 'hit' && <HitShot />}
    {status === 'miss' && <MissShot />}
  </Cell>
);

export const Game = observer(() => {
  const {
    battleStore: { createConnection, sendMessage, wsIsAvailable },
    shipsStore: { transformToGameView }
  } = useStores();
  useEffect(() => {
    createConnection();
  });

  useEffect(() => {
    console.log('inside autorun', wsIsAvailable);
    console.log('wsIsAvailable', wsIsAvailable);
    wsIsAvailable && sendMessage({ ships: transformToGameView });
  }, [sendMessage, transformToGameView, wsIsAvailable]);

  const battleAtea = [...Array(100).keys()];

  console.log('rerender');
  return (
    <Wrapper>
      <h3>enemy ships</h3>
      <Area>{battleAtea.map(item => renderCell(item))}</Area>
      <h3>your ships</h3>
      <Area>{battleAtea.map(item => renderCell(item))}</Area>
    </Wrapper>
  );
});
