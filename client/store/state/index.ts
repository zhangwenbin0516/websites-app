
import { Locale } from 'antd/lib/locale'
import zhCN from 'antd/locale/zh_CN'
interface LocaleProps extends Locale {

}
export interface StateProps {
  locale?: LocaleProps
  routes?: Array<object>
  errors?: Array<any>
}

export interface ActionProps {
  type: string
  [key: string]: any
}

export interface ContextProps {
  children: React.ReactNode,
  value?: any
}

export const initValue: StateProps = {
  locale: zhCN,
  routes: [],
  errors: []
}
