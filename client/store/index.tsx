import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import { initValue, ContextProps } from './state'

const APPContext: any = createContext({} as ContextProps)

export const APP = (props: ContextProps) => {
  const [state, dispatch] = useReducer(reducer, { ...initValue, ...props.value })
  
  return(<APPContext.Provider value={{state, dispatch}}>
    { props.children }
  </APPContext.Provider>)
}

export default APPContext