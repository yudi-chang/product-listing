// import { defineNuxtPlugin } from '#app';
// import type { Pinia } from 'pinia';
// import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// export default defineNuxtPlugin((nuxtApp) => {
//   const pinia = nuxtApp.$pinia as Pinia;
//   pinia.use(piniaPluginPersistedState);
// });

import { defineNuxtPlugin } from '#app';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import type { Pinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  (nuxtApp.$pinia as Pinia).use(piniaPluginPersistedState);
});
