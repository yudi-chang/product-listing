<template>
  <div>
    <!-- Cart Icon -->
    <div class="cart-icon-wrapper" @click="toggleCart" :class="{ shake: cartStore.isShaking }" ref="cartIcon">
      <div style="position: relative">
        <img src="/images/cart.png" alt="Cart" />
        <div class="total-product-wrapper fw-bold">
          <div class="total-product">{{  cartStore.totalCartQuantity }}</div>
        </div>
      </div>
    </div>

    <!-- Cart Dropdown -->
    <transition name="slide-up">
      <div v-if="showCart" class="cart-dropdown" ref="cartDropdown" @click.stop>
        <ul v-if="cartStore.products.length > 0">
          <li v-for="item in cartStore.products" :key="item.productId + item.variation" class="cart-item">
            <img :src="item.image" alt="Product Image" class="cart-item-image" />
            <div class="cart-item-details">
              <p class="fw-bold">{{ item.name }} - {{ item.variation }}</p>
              <p>Price: ${{ item.price.toFixed(2) }}</p>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Total: ${{ item.total.toFixed(2) }}</p>
            </div>
            <button class="remove-btn" @click="removeItem(item.productId, item.variation, $event)">Remove</button>
          </li>
        </ul>
        <p v-else>Your cart is empty.</p>
        <div class="cart-summary">
          <p class="fw-bold">Total Items: {{ cartStore.totalCartQuantity }}</p>
          <p class="fw-bold">Total Price: ${{ cartStore.totalCartPrice.toFixed(2) }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

// store
const cartStore = useCartStore();

// reactive data
const showCart = ref(false);
const cartDropdown = ref(null);
const cartIcon = ref(null);

// cycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// methods
const toggleCart = () => {
  showCart.value = !showCart.value;

  if (showCart.value) {
    nextTick(() => {
      if (cartDropdown.value) {
        cartDropdown.value.scrollTop = cartDropdown.value.scrollHeight;
      }
    });
  }
}

const removeItem = (productId, variation, event) => {
  event.stopPropagation();
  cartStore.removeFromCart(productId, variation);
}

const handleClickOutside = (event) => {
  const isClickInsideDropdown = cartDropdown.value?.contains(event.target);
  const isClickOnIcon = cartIcon.value?.contains(event.target);

  if (!isClickInsideDropdown && !isClickOnIcon) {
    showCart.value = false;
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/_variables.scss' as *;

.cart-icon-wrapper {
  border-radius: 50%;
  border: solid 2px var(--primary-color);
  position: fixed;
  bottom: 50px;
  right: 25px;
  width: 50px;
  height: 50px;
  padding: 5px;
  cursor: pointer;
  background-color: var(--secondary-color);
  z-index: 9;

  &.shake {
    animation: shakeCart .4s ease-in-out forwards;
  }

  .total-product-wrapper {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 25px;
    height: 25px;
    background-color: var(--primary-color);
    border-radius: 50%;

    .total-product {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: var(--secondary-color);
    }
  }

  img {
    width: 100%;
  }
}

.cart-dropdown {
  position: fixed;
  bottom: 110px;
  right: 25px;
  width: 600px;
  max-height: 450px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 1000;
  overflow-y: scroll;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;

    .cart-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .cart-item-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 10px;
      }

      .cart-item-details {
        flex: 1;

        p {
          margin: 0 0 5px;
          font-size: 14px;
        }
      }

      .remove-btn {
        background: var(--primary-color);
        color: var(--secondary-color);
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }

  .cart-summary {
    margin-top: 15px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
    text-align: left;

    p {
      margin: 5px 0;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@keyframes shakeCart {
  25% {
    transform:translateX(6px)
  }
  50% {
    transform:translateX(-4px);
  }
  75% {
    transform:translateX(2px);
  }
  100% {
    transform:translateX(0);
  }
}

@media (max-width: $breakpoint-md) {
  .cart-icon-wrapper {
    right: 10px;
    bottom: 20px
  }

  .cart-dropdown {
    right: 0;
    bottom: 80px;
  }
}

@media (max-width: $breakpoint-sm) {
  .cart-dropdown {
    width: 100vw;
    max-height: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1);
    border: solid 1px var(--primary-color);

    ul {

      .cart-item {
        display: block;

        .cart-item-image, .cart-item-details {
          display: inline-block;
          vertical-align: top;
        }

        .remove-btn {
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
}

@media (max-height: 400px) {
  .cart-dropdown {
    max-height: calc(100vh - 100px);
    //display: none;
  }
}
</style>
