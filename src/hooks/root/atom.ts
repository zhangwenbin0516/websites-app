import {atom} from 'recoil'

export interface RootState {
    locale: string
    localeText?: string
}

export const RootProivder = atom<RootState>({
    key: 'rootState',
    default: {
        locale: 'zh-CN',
        localeText: '简体中文'
    }
})