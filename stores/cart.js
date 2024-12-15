import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    isShaking: false, // for animation purpose when user add cart
  }),
  actions: {
    addToCart(product, variation, quantity) {
      const existingItemIndex = this.products.findIndex(
        (item) => item.productId === product.id && item.variation === variation
      );

      if (existingItemIndex > -1) {
        this.products[existingItemIndex].quantity += quantity;
        this.products[existingItemIndex].total = this.products[existingItemIndex].quantity * product.price;
      } else {
        this.products.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          variation: variation,
          quantity: quantity,
          total: product.price * quantity,
          image: product.images[0],
        });
      }

      this.triggerShake();
    },

    triggerShake() {
      this.isShaking = true;
      setTimeout(() => {
        this.isShaking = false; // Reset shake after animation
      }, 400); // Match the duration of your shake animation
    },

    removeFromCart(productId, variation) {
      this.products = this.products.filter(
        (item) => item.productId !== productId || item.variation !== variation
      );
    },

    updateQuantity(productId, variation, quantity) {
      const existingItemIndex = this.products.findIndex(
        (item) => item.productId === productId && item.variation === variation
      );

      if (existingItemIndex > -1) {
        this.products[existingItemIndex].quantity = quantity;
        this.products[existingItemIndex].total =
          quantity * this.products[existingItemIndex].price;

        if (quantity <= 0) {
          this.products.splice(existingItemIndex, 1);
        }
      }
    },
  },
  getters: {
    totalCartPrice() {
      return this.products.reduce((total, item) => total + item.total, 0);
    },

    totalCartQuantity() {
      return this.products.reduce((total, item) => total + item.quantity, 0);
    },
  },
  persist: true
});
