import { SpaConfig } from './config'
const configs: Array<SpaConfig> = [
  {
    name: 'angular',
    activeWhen: '/angular',
    app: () => import('../applications/app.angular')
  }
];

export default configs;