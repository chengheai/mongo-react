import { get_heros, post_hero, delete_hero, put_heros, put_add_pic } from './../services/hero';

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
      callback(data);
    },
    *post_hero({ payload, callback }, { call }) {
      const response = yield call(post_hero, payload);
      const data = response.data;
      callback(data);
    },
    *delete_hero({ payload, callback }, { call }) {
      const response = yield call(delete_hero, payload);
      const data = response.data;
      callback(data);
    },
    *put_heros({ payload, callback }, { call }) {
      const response = yield call(put_heros, payload);
      const data = response.data;
      callback(data);
    },
    *put_add_pic({ payload, callback }, { call }) {
      const response = yield call(put_add_pic, payload);
      const data = response.data;
      callback(data);
    }
  },
};
