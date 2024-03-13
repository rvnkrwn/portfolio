// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    appName: 'Revan Kurniawan',
    jwtAccessSecret: process.env.ACCESS_SECRET_TOKEN,
    jwtRefreshSecret: process.env.REFRESH_SECRET_TOKEN

  }
})
