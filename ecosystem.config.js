module.exports = {
    apps: [
  
      {
        name: "dev-app",
        script: "app.js",
        instances: 1,
        env_development: {
          NODE_ENV: "development",
          PORT: 7000
        }
      },
  
      {
        name: "staging-app",
        script: "app.js",
        instances: 1,
        env_staging: {
          NODE_ENV: "staging",
          PORT: 4000
        }
      },
  
      {
        name: "prod-app",
        script: "app.js",
        instances: "max",
        exec_mode: "cluster",
        env_production: {
          NODE_ENV: "production",
          PORT: 80
        }
      }
  
    ]
  }
  