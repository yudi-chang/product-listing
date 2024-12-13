<template>
  <div>
    <Container>
      <h1>Catalog</h1>
      <div class="products">
        <div v-for="product in productStore.products" :key="product.id" class="product-card">
          <NuxtLink :to="`/product/${product.id}`">
            <div class="product-img">
              <img :src="product.image" alt="product.name" />
            </div>
            <div class="product-info pv-12 ph-16">
              <h2>{{ product.name }}</h2>
              <div>{{ product.price }}</div>
              <div>Tags:</div>
              <div class="tags mt-8">
                <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import Container from '~/components/Container.vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
  console.log("@@@@@@@@@@@@@")
  console.log(productStore)
});

</script>

<style scoped lang="scss">
.products {
  display: flex;
  flex-wrap: wrap; 
  gap: 35px; 
  justify-content: flex-start;
}

.product-card {
  display: flex;
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
      border-radius: 8px;
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
    background-color: #ddd;
    border-radius: 5px;
    font-size: 0.9em;
  }
}
</style>
