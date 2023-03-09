import { SpaConfig } from './config'
const configs: Array<SpaConfig> = [
  {
    name: 'vue',
    activeWhen: '/vue',
    app: () => import('../applications/app.vue')
  }
];

export default configs;