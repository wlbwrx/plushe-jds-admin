import {
   createRouter,
   createWebHashHistory
} from 'vue-router'

// 加载路由配置
import routesSlide from './routes/index'

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({
        y: 0,
    }),
    routes: routesSlide,
});
export default router;