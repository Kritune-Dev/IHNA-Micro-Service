module.exports = {
  apps: [
    {
      name: 'calendar-service',
      nameSpace: 'IHNA',
      script: 'src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
}
