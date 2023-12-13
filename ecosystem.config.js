module.exports = {
  apps : [{
    name: 'starter-app',
    script: 'app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'debug',
      HTTP_PORT: 3000,
      JAMBONZ_ACCOUNT_SID: '98121bc4-9953-4f91-b0ba-17e41b452bd9',
      JAMBONZ_API_KEY: 'cfa145e7-024a-418c-b517-31a2910c2c3e',
      JAMBONZ_REST_API_BASE_URL: 'https://jambonz.cloud',
      WEBHOOK_SECRET: 'wh_secret_tfbZzHie6ujzjU3PSd46M2',
    }
  }]
};
