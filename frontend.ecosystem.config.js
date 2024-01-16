require('dotenv').config({ path: 'apps/frontend/.env' });

const appName = process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase() ?? 'app';

module.exports = {
  apps: [
    {
      name: `${appName} frontend`,
      script: 'node_modules/next/dist/bin/next',
      cwd: 'apps/frontend',
      args: `start --port ${process.env.PORT}`,
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
