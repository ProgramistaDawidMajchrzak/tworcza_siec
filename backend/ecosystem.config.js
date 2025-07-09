module.exports = {
  apps: [
    {
      name: "backend",
      script: "./app.js",
      watch: false,
      env: {
	DATABASE_URL:"postgresql://admin:d4k3-0605-onm1@localhost:5432/tworczaSiecDB?schema=public",
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
}
