<template>
  <div>
    <header class="ph-20">
      <h1 class="pv-8">My Store</h1>
      <nav>
        <ul>
          <li 
            v-for="link in links" 
            :key="link.name" 
            :class="{ active: route.path === link.to }"
            class="fw-bold ph-12 pv-8"
          >
            <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
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
import { useRoute } from 'vue-router';

// meta
definePageMeta({
  head: {
    title: 'Yudi Store',
    meta: [
      { hid: 'description', name: 'description', content: 'This is Yudi store, checkout our awesome product' },
      { hid: 'og:title', property: 'og:title', content: 'Yudi Store' },
      { hid: 'og:description', property: 'og:description', content: 'Shop for everyone.' },
    ],
  },
});

// store
const route = useRoute();

// others
const links = [
  { name: "Catalog", to: "/" },
  { name: "Contact Us", to: "/contact-us" }
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

header {
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: end;

  * {
    color: var(--secondary-color);
  }

  ul {
    list-style: none;

    li {
      display: inline-block;
      vertical-align: bottom;
      margin: 0 5px;
      font-size: 20px;

      &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 4px;
          transform: translateX(-50%);
          background-color: var(--secondary-color);
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          transition: width 0.3s ease;
        }

      &.active, &:hover {
        position: relative;

        &:after {
          width: 100%;
          transition: width 0.3s ease;
        }
      }
    }
  }
}

main {
  min-height: calc(100vh - 100px);
  padding: 20px;
}

footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

// responsive
@media (max-width: $breakpoint-md) {
  .products {
    gap: 15px; 
  }

  .product-card {
    width: calc(50% - 10px);
  }
  
  main {
    padding: 10px;
  }
}

</style>
