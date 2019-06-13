import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { storage } from '@/common/storage'

export interface UserState {
    userName: string
    userId: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
    userName: string = storage.session.get('userName') || ''
    userId: string = storage.session.get('userId') || ''

    @Mutation
    updateUserName(userName: string) {
        this.userName = userName
    }

    @Mutation
    updateUserId(userId: string) {
        this.userId = userId
    }
    
    @Action({ commit: 'updateUserName' })
    changeUserName(userName: string) {
        return userName
    }
    @Action({ commit: 'updateUserId' })
    changeUserId(userId: string) {
        return userId
    }
}

export const UserlModule = getModule(User)
