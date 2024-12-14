import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    isLoading: false,
    isErrorFetching: false,
  }),
  actions: {
    async fetchProducts() {
      try {
        this.isLoading = true;
        this.isErrorFetching = false;
        const response = await fetch('https://my-json-server.typicode.com/yudi-chang/products-be/db');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        this.isErrorFetching = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});