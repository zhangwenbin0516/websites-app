import * as spa from 'single-spa'

import ReactConfigs from './react.config'
import VueConfigs from './vue.config'
import AngularConfig from './angular.config'

const configs = [
  ...ReactConfigs,
  ...VueConfigs,
  ...AngularConfig
]

configs.filter((item) => {
  spa.registerApplication({
    name: item.name,
    app: item.app,
    activeWhen: item.activeWhen
  })
})


spa.start()