import { SpaConfig } from './config'
const configs: Array<SpaConfig> = [
  {
    name: 'react',
    activeWhen: '/react',
    app: () => import('../applications/app.react')
  }
];

export default configs;