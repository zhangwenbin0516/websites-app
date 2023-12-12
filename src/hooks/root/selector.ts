import { selector } from 'recoil'
import {RootProivder, RootState} from './atom'

export const RootRender = selector<RootState>({
    key: 'rootRender',
    get: ({get}) => {
        const state = get(RootProivder)
        return state
    }
})