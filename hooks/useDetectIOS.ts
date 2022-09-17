import { useMemo } from "react";

const useDetectIOS = () =>
  useMemo(
    () =>
      globalThis.window &&
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(window as typeof window & { MSStream: any }).MSStream,
    []
  );

export default useDetectIOS;
