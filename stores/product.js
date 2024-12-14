import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  // all state has simple assignment in action, and only assigned inside this store, so I'll not create mutations for these state
  // if there is some changed needed outside of store, will need to create mutations
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
        
        // using modulus to generate new id because API is mocked and limited (currently only 2 product detail exists)
        // so I will use those 2 product detail for every products
        // in real life case, it should send the product id as payload (not modified version)
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
