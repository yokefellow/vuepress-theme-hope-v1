import { Component, Vue } from "vue-property-decorator";
import { HopeLangI18nConfig, i18n } from "@mr-hope/vuepress-shared-utils";
import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { TimeIcon } })
export default class ReadtimeInfo extends Vue {
  private get readtime(): string {
    const { readingTime } =
      (this.$themeLocaleConfig as HopeLangI18nConfig) ||
      i18n.getDefaultLocale();

    return this.$page.readingTime.minutes < 1
      ? readingTime.minute
      : readingTime.time.replace(
          "$time",
          Math.round(this.$page.readingTime.minutes).toString()
        );
  }

  private get hint(): string {
    return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
      .readingTime;
  }
}
