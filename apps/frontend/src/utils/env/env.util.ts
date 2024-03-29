import type { Env } from './env.type';
import type { ValueOf } from 'src/types';

export const envModes = {
  dev: 'development',
  prod: 'production',
  test: 'test',
} as const;
export type EnvModes = typeof envModes;

const processEnvMode = process.env.NODE_ENV.toLowerCase() as ValueOf<EnvModes>;
const envMode = Object.values(envModes).includes(processEnvMode) ? processEnvMode : envModes.dev;

const isEnv = (mode: ValueOf<EnvModes>) => envMode.toLowerCase() === mode;

export const getEnvMode = () => envMode;

export const isDevEnv = () => isEnv(envModes.dev);

export const isProdEnv = () => isEnv(envModes.prod);

export const isTestEnv = () => isEnv(envModes.test);

const mapEnv = () => {
  const parsed: Env = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || '',
    apiKey: process.env.API_KEY || '',
    // use proxy path if set otherwise use absolute backend url
    backendUrl:
      (process.env.NEXT_PUBLIC_BACKEND_PROXY_PATH
        ? process.env.NEXT_PUBLIC_FRONTEND_URL + process.env.NEXT_PUBLIC_BACKEND_PROXY_PATH
        : process.env.NEXT_PUBLIC_BACKEND_URL) || '',
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
  };

  return Object.freeze(parsed);
};

let env: Readonly<Env> | undefined;
export const getEnv = () => {
  if (!env) {
    env = mapEnv();
  }
  return env;
};
