import Vue from 'vue'
import Vuex from 'vuex'
import { GlobalState } from './modules/global'
import { UserState } from './modules/user'

Vue.use(Vuex)

export interface RootState {
    global: GlobalState,
    user: UserState
}

export default new Vuex.Store<RootState>({})
