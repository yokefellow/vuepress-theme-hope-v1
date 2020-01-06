import { PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';

const pluginOption: PluginOptionAPI = {
  name: 'screen-full',

  enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

  /** Typescript Support */
  chainWebpack: chainWebpackConfig => {
    chainWebpackConfig.resolve.extensions.add('.ts');

    chainWebpackConfig.module
      .rule('ts')
      .test(/\.ts$/u)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        appendTsSuffixTo: [/\.vue$/u],
        compilerOptions: { declaration: false }
      });
  }
};

module.exports = pluginOption;