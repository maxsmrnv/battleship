import { playerStore } from './features/InitGame';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootStore = {
  playerStore,
  history
};
