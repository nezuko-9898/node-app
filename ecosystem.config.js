module.exports = {
    apps: [
      {
        name: "node-app",
        script: "app.js",
        exec_mode: "cluster",
        instances: "max",
  
        env_development: {
          NODE_ENV: "development",
          PORT: 7000
        },
  
        env_staging: {
          NODE_ENV: "staging",
          PORT: 4000
        },
  
        env_production: {
          NODE_ENV: "production",
          PORT: 80
        }
      }
    ]
  };
  