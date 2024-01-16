require('dotenv').config({ path: 'apps/frontend/.env' });

const appName = process.env.NEXT_PUBLIC_APP_NAME?.toLowerCase() ?? 'app';

module.exports = {
  apps: [
    {
      name: `${appName} backend`,
      cwd: 'apps/backend',
      script: `PORT=${process.env.PORT} dist/main.js`,
      instances: '1',
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
