const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      corejs: '3.2.1',
      useBuiltIns: 'entry',
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
]

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-transform-typescript',
]

module.exports = { presets, plugins }
