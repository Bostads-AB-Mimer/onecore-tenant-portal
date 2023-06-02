import configPackage from '@iteam/config'

export interface Config {
  port: number
  core: {
    url: string
  }
}

const config = configPackage({
  file: `${__dirname}/../config.json`,
  defaults: {
    port: 5001,
    core: {
      url: 'http://localhost:5010',
    },
  },
})

export default {
  port: config.get('port'),
  core: config.get('core'),
} as Config
