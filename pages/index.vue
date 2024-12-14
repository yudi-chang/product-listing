<template>
  <div style="width: 100%;">
    <Container>
      <h1 class="mb-28">Catalog</h1>
      <div class="products">
        <div v-if="productStore.isLoading" class="loader"></div>
        <template v-else-if="productStore.isErrorFetching">
          <ErrorMessage @retry-fetch="productStore.fetchProducts()"/>
        </template>
        <template v-else>
          <div v-for="product in productStore.products" :key="product.id" class="product-card">
            <NuxtLink :to="`/product/${product.id}`">
              <article>
                <div class="product-img">
                  <img :src="product.image" :alt="`Image of ${product.name}`" loading="lazy" />
                </div>
                <div class="product-info pt-16 pb-4 ph-16">
                  <h2 class="fw-normal">{{ product.name }}</h2>
                  <div class="mv-12 fw-bold">{{ product.price }}$</div>
                </div>
                <div class="tags pt-4 pb-16 ph-16">
                  <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </article>
            </NuxtLink>
          </div>
        </template>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import Container from '~/components/Container.vue';

const productStore = useProductStore();

onMounted(() => {
  // no need async await since only have this fetch operation (hence no need to wait fetch first before doing something else)
  productStore.fetchProducts();
});
</script>

<style scoped lang="scss">
.loader {
  margin: 30vh auto 0 auto;
}

.products {
  display: flex;
  flex-wrap: wrap; 
  gap: 35px; 
  justify-content: flex-start;
}

.product-card {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 8px;
  width: calc(25% - 35px);
  box-sizing: border-box;
  min-height: 300px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .product-img {
    width: 100%;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  a {
    width: 100%;
  }

  p {
    font-size: 1em;
    color: #333;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    padding: 5px 10px;
    margin: 3px 0;
    border-radius: 6px;
    background: var(--primary-color);
    color: var(--secondary-color);
  }
}
</style>
