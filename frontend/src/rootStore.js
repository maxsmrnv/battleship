import { createBrowserHistory } from 'history';
import { playerStore } from './features/InitPlayer';
import { shipsStore } from './features/InitGame';
import { battleStore } from './features/Game';

export const history = createBrowserHistory();

export const rootStore = {
  shipsStore,
  playerStore,
  battleStore,
  history,
};
