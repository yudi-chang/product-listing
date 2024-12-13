<template>
  <div>
    <h1>{{ product.name }}</h1>
    <img :src="product.image" alt="product.name" />
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <div v-if="product.variants">
      <h3>Variants</h3>
      <ul>
        <li v-for="variant in product.variants" :key="variant">{{ variant }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: product } = await useFetch(`https://my-json-server.typicode.com/username/repo/products/${route.params.id}`);
</script>

<style scoped>

</style>
