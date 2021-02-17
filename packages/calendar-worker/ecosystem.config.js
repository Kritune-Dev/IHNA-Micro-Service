module.exports = {
  apps: [
    {
      name: 'Calendar-Worker',
      namespace: 'IHNA-Worker',
      script: 'src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5002
      }
    }
  ]
}
