import {ExtraProps} from 'single-spa'
export interface SpaConfig {
  name: string
  app: ExtraProps
  activeWhen: string
}