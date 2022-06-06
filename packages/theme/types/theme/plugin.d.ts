import type { GitOptions } from "@mr-hope/vuepress-plugin-git";
import type { SmoothScrollOptions } from "@mr-hope/vuepress-plugin-smooth-scroll";
import type { ActiveHashOptions } from "vuepress-plugin-active-hash";
import type { CommentOptions } from "vuepress-plugin-comment1";
import type { AvailableComponent } from "@mr-hope/vuepress-plugin-components";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code1";
import type { FeedOptions } from "vuepress-plugin-feed1";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PWAOptions } from "vuepress-plugin-pwa1";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { SeoOptions } from "vuepress-plugin-seo1";
import type { SitemapOptions } from "vuepress-plugin-sitemap1";

import type { Page, ResolvedComponent } from "vuepress-typings";

/**
 * 重命名块选项
 *
 * Options for renaming chunks
 */
export interface ChunkRenameOptions {
  /**
   * 页面块重命名选项。 默认情况下，所有页面块都将以页面标题命名。
   *
   * Page Chunk Rename Option. By default, all page chunks will be named with page title.
   */
  pageChunkName: ((page: Page) => string) | false;

  /**
   * 布局块重命名选项。 默认情况下，所有布局块都将通过其组件名称来命名。
   *
   * Layout Chunk Rename Option. By default, all the layout chunks will be named by their component name.
   */
  layoutChunkName: ((layout: ResolvedComponent) => string) | false;
}

/**
 * Options for cleaning url suffix
 */
export interface CleanUrlOptions {
  /**
   * 普通页面后缀。此默认行为将为 `/a/b.md` 生成 `/a/b`。
   *
   * Nornal Page suffix. This default behavior will generate `a/b.md` with `/a/b`.
   *
   * @default ''
   */
  normalSuffix: string;
  /**
   * `index.md`，`readme.md` 和 `README.md` 的页面后缀。此默认行为将为 `a/readme.md` 生成 `/a/`。
   *
   * Page suffix for `index.md`, `readme.md` and `README.md`. This default behavior will generate `a/readme.md` with `/a/`.
   *
   * @default '/'
   */
  indexSuffix: string;
  /**
   * 未找到页面的链接
   *
   * Link for not found pages
   *
   * @default './404.html'
   */
  notFoundPath: string;
}

/**
 * 版权设置
 *
 * Copyright Settings
 */
export interface HopeCopyrightPluginOptions {
  /**
   * 功能状态
   *
   * - `'global'` 意味着全局启用
   * - `'local'` 意味着全局禁用，可在页面内启用
   *
   * Feature Status
   *
   * - `'global'` means enabled globally
   * - `'local'` means disabled globally and can be enabled in pages
   *
   * @default 'global'
   */
  status?: "global" | "local";
  /**
   * 触发版权信息或禁止复制动作的最少字符数
   *
   * The minimum text length that triggers the clipboard component or the noCopy effect
   */
  minLength?: number;
  /**
   * 是否禁止复制
   *
   * Whether to prohibit copying.
   */
  noCopy?: boolean;
  /**
   * 是否禁止选中文字
   *
   * Whether to prohibit selecting.
   */
  noSelect?: boolean;
}

interface HopeThemePluginOptions {
  /**
   * AddThis 的公共 ID
   * @see http://vuepress-theme-hope.gitee.io/v1/add-this/zh/config.html
   *
   * pubid for addthis
   * @see http://vuepress-theme-hope.github.io/v1/add-this/config.html
   */
  addThis?: string;

  activeHash?: ActiveHashOptions | false;

  /**
   * 评论插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/comment/zh/config/
   *
   * Comment plugin options
   * @see http://vuepress-theme-hope.github.io/v1/comment/config/
   */
  comment?: CommentOptions | false;

  /**
   * 评论插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/components/zh/config.html
   *
   * Comment plugin options
   * @see http://vuepress-theme-hope.github.io/v1/components/config.html
   *
   * @default ['Badge']
   */
  components?: AvailableComponent[];

  /**
   * chunk 重命名
   *
   * @see https://vuepress-theme-hope.gitee.io/v1/zh/config/theme/plugin/#chunkrename
   *
   * Chunk Rename
   * @see https://vuepress-theme-hope.github.io/v1/config/theme/plugin/#chunkrename
   */

  chunkRename?: ChunkRenameOptions | false;

  /**
   * 清理插件配置
   * @see https://vuepress-theme-hope.gitee.io/v1/zh/config/theme/plugin/#cleanurl
   *
   * Clean Url options
   * @see https://vuepress-theme-hope.github.io/v1/config/theme/plugin/#cleanurl
   */
  cleanUrl?: CleanUrlOptions | false;

  /**
   * 代码复制插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/copy-code/zh/config.html
   *
   * code copy plugin options
   * @see http://vuepress-theme-hope.github.io/v1/copy-code/config.html
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * 版权设置
   *
   * Copyright plugin options
   */
  copyrightPlugin?: HopeCopyrightPluginOptions;

  /**
   * Feed 插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/feed/zh/config/
   *
   * Feed plugin options
   * @see http://vuepress-theme-hope.github.io/v1/feed/config/
   */
  feed?: Partial<FeedOptions> | false;

  /**
   * Git 插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/git/zh/
   *
   * Git plugin options
   * @see http://vuepress-theme-hope.github.io/v1/git/
   */
  git?: GitOptions | false;

  /**
   * Markdown 增强插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/md-enhance/zh/config.html
   *
   * Markdown enhance plugin options
   * @see http://vuepress-theme-hope.github.io/v1/md-enhance/config.html
   */
  mdEnhance?: MarkdownEnhanceOptions;

  /**
   * PWA 插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/pwa/zh/config.html
   *
   * PWA plugin options
   * @see http://vuepress-theme-hope.github.io/v1/pwa/config.html
   */
  pwa?: PWAOptions | false;

  /**
   * 图片预览插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/photo-swipe/zh/config.html
   *
   * Photo Swipe plugin options
   * @see http://vuepress-theme-hope.github.io/v1/photo-swipe/config.html
   */
  photoSwipe?: PhotoSwipeOptions | false;

  /**
   * SEO 插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/seo/zh/config.html
   *
   * SEO plugin options
   * @see http://vuepress-theme-hope.github.io/v1/seo/config.html
   */
  seo?: SeoOptions | false;

  /**
   * Sitemap 插件配置
   * @see http://vuepress-theme-hope.gitee.io/v1/sitemap/zh/config.html
   *
   * Sitemap plugin options
   * @see http://vuepress-theme-hope.github.io/v1/sitemap/config.html
   */
  sitemap?: SitemapOptions | false;

  /**
   * ts-loader 选项
   *
   * Options which will passed to ts-loader
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typescript?: Record<string, any> | boolean;

  /**
   * 每分钟的阅读字数
   *
   * Reading speed of word per minute
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * 是否启用平滑滚动
   *
   * Enable smooth scrolling feature
   *
   * @default true
   */
  smoothScroll?: SmoothScrollOptions | number | false;
}
