import { get_heros, post_hero, delete_hero, put_heros, put_add_pic, get_hero_detail, put_edit_pic } from '../services/hero';
import queryString from 'query-string';
export default {
  namespace: 'Hero',

  state: {
    detail: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      console.log(history)
      history.listen((location) => {
        const pathname = location.pathname;
        let { search } = location;
        const query = queryString.parse(search);
        console.log('query: ', query);
        if(pathname === '/detail') {
          dispatch({
            type: 'get_hero_detail', //在model内不需要加namespace，如果在外面用则需要加
            payload: query.id
          })
        }
      })
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
    },
    *put_edit_pic({ payload, callback }, { call }) {
      const response = yield call(put_edit_pic, payload);
      const data = response.data;
      callback(data);
    },
    *get_hero_detail({ payload, callback }, { call, put }) {
      yield put({ type: 'queryHeroDetail', payload: { detail: {} } });
      const data = yield call(get_hero_detail, payload);
      console.log('detail:', data.data)
      if (data) {
        yield put({
          type: 'queryHeroDetail',
          payload: {
            detail: data.data
          },
        })
      }
    }
  },
  reducers: {
    queryHeroDetail(state, action) {
      return { ...state, ...action.payload, ...action.detail };
    }
  }
};
