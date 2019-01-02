import dva from 'dva';
import { message } from 'antd';
import './index.css';

// 1. Initialize
const app = dva({
  onError(e, dispatch) {
    message.error(`${e.message}` || '接口错误');
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Hero').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
