<template>
  <div>
    <header class="ph-20">
      <h1 class="pv-8" style="cursor: pointer;"><NuxtLink to="/">My Store</NuxtLink></h1>
      <nav :class="{ 'active' : isActive }">
        <ul>
          <li 
            v-for="link in links" 
            :key="link.name" 
            :class="{ active: route.path === link.to }"
            class="fw-bold ph-12 pv-8"
          >
            <span>
              <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
            </span>
          </li>
        </ul>
      </nav>
      <BurgerIconMenu v-model:active="isActive" class="burger-icon-menu"/>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer>
      <Cart />
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
const isActive = ref(false);

// others
const links = [
  { name: "Catalog", to: "/" },
  { name: "Contact Us", to: "/contact-us" }
];

//watch 
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    isActive.value = false;
  }
);

// methods
const handleToggleMenu = (newIsActive) => {
  isActive.value = newIsActive
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

header {
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: end;

  .burger-icon-menu {
    display: none;
  }

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
      position: relative;
      
      span {
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
      }

      &.active, &:hover {

        span {
          &:after {
            width: 100%;
            transition: width 0.3s ease;
          }
        }
      }
    }
  }
}

main {
  min-height: calc(100vh - 100px);
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
}

@media (max-width: $breakpoint-sm) {
  header {
    padding-right: 0;

    nav {
      background: var(--primary-color);
      position: fixed;
      top: 60px;
      right: 0;
      height: 100%;
      width: 0%;
      z-index: 10;
      opacity: 0;
      transition: all 600ms cubic-bezier(.62,.04,.3,1.56);
      transition-delay: 100ms;
      border-top: solid 1px var(--secondary-color);
      padding-top: 20px;
      padding-right: 10px;
      
      * {
        color: var(--secondary-color);
      }
      
      &.active {
        width: 100%;
        opacity: 1;
      }

      ul {
        margin: 0;

        li {
          list-style: none;
          font-size: 24px;
          color: #fff;
          line-height: 2.2;
          text-transform: uppercase;
          letter-spacing: 1.7px;
          display: block;
          width: auto;
          text-align: right;

          span {
            position: relative;

            &:after {
              bottom: -8px;
            }
          }
        }
      }
    }

    .burger-icon-menu {
      display: block;
    }
  }
}
</style>
