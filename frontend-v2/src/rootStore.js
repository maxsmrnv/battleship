import { playerStore } from './features/InitPlayer';
import { shipsStore, battleStore } from './features/InitGame';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootStore = {
  shipsStore,
  playerStore,
  battleStore,
  history
};
