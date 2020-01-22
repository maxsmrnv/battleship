import { playerStore } from './features/InitPlayer';
import { shipsStore } from './features/InitGame';
import { battleStore } from './features/Game';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootStore = {
  shipsStore,
  playerStore,
  battleStore,
  history
};
