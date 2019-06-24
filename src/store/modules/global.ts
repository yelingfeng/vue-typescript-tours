import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
} from 'vuex-module-decorators'
import store from '@/store'

export interface GlobalState {
    gMapMaxZoom: number
    menuList: Array<object>
    // 号码加密
    isPhoneJM: boolean
}

@Module({ dynamic: true, store, name: 'global' })
class Global extends VuexModule implements GlobalState {
    gMapMaxZoom: number = 17
    menuList: Array<object> = []
    isPhoneJM: boolean = false
}

export const GlobalModule = getModule(Global)
