export default defineNuxtConfig({
  css: [
    "@/assets/styles/main.scss",
  ],
  modules: ["@pinia/nuxt"],
  build: {
    transpile: [],
  },
  ssr: true,
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' }
      ]
    }
  },
  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  },
});
