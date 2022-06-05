import { getLocales, noopModule, path } from "vuepress-shared";
import {
  backToTopLocales,
  externallinkLocales,
  paginationLocales,
  pageInfoLocales,
} from "./locales";

import type { Plugin, PluginConfig } from "vuepress-typings";
import type { ComponentOptions } from "../types";

export const componentPlugin: Plugin<ComponentOptions> = (options, context) => {
  const plugins: PluginConfig<unknown>[] = [];

  if (options.pageinfo)
    plugins.push(
      ["@mr-hope/git", true],
      ["reading-time1", { wordPerminute: options.wordPerminute }]
    );

  const PLUGIN_NAME = "@mr-hope/vuepress-plugin-components";

  return {
    name: PLUGIN_NAME,

    alias: {
      "@BackToTop": options.backToTop
        ? path.resolve(__dirname, "../client/components/BackToTop.vue")
        : noopModule,
      "@BreadCrumb": options.breadcrumb
        ? path.resolve(__dirname, "../client/BreadCrumb.vue")
        : noopModule,
      "@Badge": options.components?.includes("Badge")
        ? path.resolve(__dirname, "../client/components/Badge.vue")
        : noopModule,
      "@ExternalLinkIcon": options.components?.includes("ExternalLinkIcon")
        ? path.resolve(__dirname, "../client/components/ExternalLinkIcon.js")
        : noopModule,
      "@FontIcon": options.components?.includes("FontIcon")
        ? path.resolve(__dirname, "../client/components/FontIcon.js")
        : noopModule,
      "@PageInfo": options.pageinfo
        ? path.resolve(__dirname, "../client/PageInfo.vue")
        : noopModule,
      "@Pagination": options.pagination
        ? path.resolve(__dirname, "../client/Pagination.vue")
        : noopModule,
      "@ScreenFull": options.screenFull
        ? path.resolve(__dirname, "../client/ScreenFull.vue")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      BACK_TO_TOP_THRESHOLD:
        typeof options.backToTop === "number" ? options.backToTop : 300,
      BACK_TO_TOP_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        default: backToTopLocales,
        config: options.backToTopLocales,
      }),
      EXTERNAL_LINK_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        default: externallinkLocales,
        config: options.externalLinkLocales,
      }),
      PAGE_INFO_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.pageInfoLocales,
        default: pageInfoLocales,
      }),
      PAGINATION_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.paginationLocales,
        default: paginationLocales,
      }),
    }),

    enhanceAppFiles: path.resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: options.backToTop ? "BackToTop" : [],

    plugins,
  };
};
