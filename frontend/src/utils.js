import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

export const useStores = () => useContext(MobXProviderContext);
