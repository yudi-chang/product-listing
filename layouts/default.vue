<template>
  <div>
    <header class="pv-8 ph-20">
      <h1>My Store</h1>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer>
      <p>&copy; 2024 My Store</p>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  head: {
    title: 'Yudi Store',
    meta: [
      { hid: 'description', name: 'description', content: 'This is Yudi store, checkout our awesome product' },
      { hid: 'og:title', property: 'og:title', content: 'Yudi Store' },
      { hid: 'og:description', property: 'og:description', content: 'Shop for everyone.' },
      //{ hid: 'og:image', property: 'og:image', content: 'https://example.com/images/catalog.jpg' },
    ],
  },
});
</script>

<style lang="scss" scoped>
header {
  background-color: var(--primary-color);
  h1 {
    color: var(--secondary-color);;

  }
}

main {
  min-height: calc(100vh - 150px);
}

footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

main {
  padding: 20px;
}
</style>
