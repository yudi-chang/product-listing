import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://my-json-server.typicode.com/yudi-chang/products-be/db');
        this.products = response.data.products;
      } catch (error) {
        console.error('Try again', error);
      }
    },
  },
});
