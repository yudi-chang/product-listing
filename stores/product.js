import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: null,
    isLoading: false,
    isErrorFetching: false,
  }),
  actions: {
    async fetchProducts() {
      try {
        this.isLoading = true;
        this.isErrorFetching = false;
        const response = await fetch('https://my-json-server.typicode.com/yudi-chang/products-be/products');
        // throw here if want to test retry fetch button
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data;
      } catch {
        this.isErrorFetching = true;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProductDetail(id) {
      try {
        this.isLoading = true;
        this.isErrorFetching = false;
        
        // using modulus to check because API is mocked and limited
        // in real case, it should send the product id as payload
        const modifiedId = (id % 2) + 1;
        const response = await fetch(`https://my-json-server.typicode.com/yudi-chang/products-be/product_detail_${modifiedId}`);
        // throw here if want to test retry fetch button
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.product = data;
      } catch {
        this.isErrorFetching = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
