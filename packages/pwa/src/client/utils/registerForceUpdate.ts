import { event } from "./event";

export const registerForceUpdate = (): void => {
  event.on("updatefound", () => {
    void navigator.serviceWorker.getRegistration().then((registration) => {
      // check whether a valid service worker is active
      if (registration && registration.active)
        // force refresh
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.reload(true);
    });
  });
};
