import { createApp } from 'vue'
import router from './router/index'
import store from './store/index';
import AVue from '@/components/avue';

// 引入element ui plus版本 ui
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/lib/theme-chalk/index.css';
//全局引用 avue
// import Avue from '@smallwei/avue';
// import '@smallwei/avue/lib/index.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import BaseSelectImg from '@/components/imagebase/BaseSelectImg';
// import BaseViewTopic from '@components/base/BaseViewTopic';

dayjs.extend(utc);
dayjs.extend(timezone);

import * as utils from '@/utils/index'


if (process.env.NODE_ENV === 'development') {
  require('dayjs/locale/zh-cn');
}
// 引入less
import Less from 'less'
// 引入全局css
import '@/assets/style/style.less';
import App from './App.vue'
// 前置路由
import './beforeEach.js'; // 路由权限
const app = createApp(App)
AVue.install(app);
app.config.globalProperties.$utils = utils
// app.use(Avue)
app.component('BaseSelectImg', BaseSelectImg);
// app.component('BaseViewTopic', BaseViewTopic);

app.use(ElementPlus, { locale })
app.use(Less)
app.use(store)
app.use(router).mount('#app')
