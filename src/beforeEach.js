import router from './router/index.js';
import { getToken } from '@/utils/auth.js'

router.beforeEach( (to, from, next) => {
    if(!getToken()){
        next()
        return
    }else{
        next()
    }    
})