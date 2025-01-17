import Vue from "vue";
import Loading from "../icons/LoadingIcon.vue";

import type { Config } from "mermaid";

import "../styles/mermaid.styl";

const getThemeVariables = (isDarkMode: boolean): Record<string, unknown> => {
  return {
    dark: isDarkMode,
    background: isDarkMode ? "#1e1e1e" : "#fff",

    primaryColor: isDarkMode ? "#389d70" : "#4abf8a",
    primaryBorderColor: isDarkMode ? "#389d70" : "#4abf8a",
    primaryTextColor: "#fff",

    secondaryColor: "#ffb500",
    secondaryBorderColor: isDarkMode ? "#fff" : "#000",
    secondaryTextColor: isDarkMode ? "#ddd" : "#333",

    tertiaryColor: isDarkMode ? "#282828" : "#efeef4",
    tertiaryBorderColor: isDarkMode ? "#bbb" : "#242424",
    tertiaryTextColor: isDarkMode ? "#ddd" : "#333",

    // note
    noteBkgColor: isDarkMode ? "#f6d365" : "#fff5ad",
    noteTextColor: "#242424",
    noteBorderColor: isDarkMode ? "#f6d365" : "#333",

    lineColor: isDarkMode ? "#d3d3d3" : "#333",
    textColor: isDarkMode ? "#fff" : "#242424",

    mainBkg: isDarkMode ? "#389d70" : "#4abf8a",
    errorBkgColor: "#eb4d5d",
    errorTextColor: "#fff",

    // flowchart
    nodeBorder: isDarkMode ? "#389d70" : "#4abf8a",
    nodeTextColor: isDarkMode ? "#fff" : "#242424",

    // sequence
    signalTextColor: isDarkMode ? "#9e9e9e" : "#242424",

    // class
    classText: "#fff",

    // state
    labelColor: "#fff",

    // colors
    fillType0: isDarkMode ? "#cf1322" : "#f1636e",
    fillType1: "#f39c12",
    fillType2: "#2ecc71",
    fillType3: "#fa541c",
    fillType4: "#25a55b",
    fillType5: "#13c2c2",
    fillType6: "#096dd9",
    fillType7: "#aa6fe9",
  };
};

export default Vue.extend({
  name: "Mermaid",

  components: { Loading },

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
  },

  data: () => ({
    loading: true,
    svgCode: "",
    observer: null as MutationObserver | null,
  }),

  mounted(): void {
    const code = decodeURIComponent(this.code);

    void Promise.all([
      import(/* webpackChunkName: "mermaid" */ "mermaid"),
      // add a delay
      new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
    ]).then(([mermaid]) => {
      const { initialize, render } = mermaid.default;

      const renderMermaid = (isDarkTheme: boolean): void => {
        // generate a unvisiable container
        const container = document.createElement("div");

        container.style.position = "relative";
        container.style.top = "-9999px";

        const renderCallback = (svgCode: string): void => {
          this.loading = false;
          this.svgCode = svgCode;
          document.body.removeChild(container);
        };

        initialize({
          theme: "base",
          themeVariables: getThemeVariables(isDarkTheme),
          ...MERMAID_OPTIONS,
          startOnLoad: false,
        } as Config);

        // clear SVG Code
        this.svgCode = "";

        document.body.appendChild(container);

        // make sure dom is refreshed
        Vue.nextTick(() => render(this.id, code, renderCallback, container));
      };

      const body = document.querySelector("body") as HTMLBodyElement;

      renderMermaid(body.classList.contains("theme-dark"));

      // watch theme change
      this.observer = new MutationObserver(() => {
        renderMermaid(body.classList.contains("theme-dark"));
      });

      this.observer.observe(body, {
        attributeFilter: ["class"],
        attributes: true,
      });
    });
  },

  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
  },

  render(h) {
    return this.svgCode
      ? // mermaid
        h("div", {
          class: "md-mermaid",
          domProps: {
            innerHTML: this.svgCode,
          },
        })
      : // loading
        h("div", { class: "md-mermaid-loading" }, [h(Loading)]);
  },
});
