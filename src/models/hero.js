import { get_heros } from './../services/hero';

export default {
  namespace: 'heroModel',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *get_heros({ payload, callback }, { call }) {
      const data = yield call(get_heros, payload);
      console.log(data)
      callback(data);
    },
  },
};
