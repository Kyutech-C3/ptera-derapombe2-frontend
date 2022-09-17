/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
