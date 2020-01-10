import { playerStore } from './features/InitGame';
import { shipsStore } from './features/ShipsPrepare';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootStore = {
  shipsStore,
  playerStore,
  history
};
