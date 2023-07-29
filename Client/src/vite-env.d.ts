/// <reference types="vite/client" />

declare type AnyFunction = (...args: any[]) => any;

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
