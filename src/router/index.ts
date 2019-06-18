import Vue from 'vue'
import Router from 'vue-router'
import { commonRouter } from './common/index'

Vue.use(Router)

let routerMenuList: any[] = []
routerMenuList = routerMenuList.concat(commonRouter)

const routes = routerMenuList.map(item => {
    return item
})

export default new Router({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
})
