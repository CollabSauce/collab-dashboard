import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import selectPlugin from '@rematch/select';

import { models, RootModel } from 'src/store/rematch/models';

export const rematchStore = init({
  plugins: [selectPlugin()],
  models,
});
