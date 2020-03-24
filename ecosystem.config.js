module.exports = {
  apps: [
    {
      name: "server",
      script: "./src/server.ts",
      instances: 1,
      autorestart: true,
      watch: ["./src"],
      watch_delay: 1000,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
