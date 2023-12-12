import {RecoilState, atom} from 'recoil'

export interface RootState {
    locale: string
}

export const RootProivder = atom<RootState>({
    key: 'rootState',
    default: {
        locale: 'zh-cn'
    }
})
