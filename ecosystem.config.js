// Does not work
// Use $ pm2 start ./src/server.ts instead

module.exports = {
  apps: [
    {
      name: "crewbuddy",
      script: "./dist/server.js",
      instances: 1,
      autorestart: true,
      watch: ["./dist"],
      watch_delay: 1000,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
