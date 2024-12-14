<template>
  <div>
    <div v-if="productStore.isLoading" class="loader"></div>
    <template v-else-if="productStore.isErrorFetching">
      <ErrorMessage @retry-fetch="retrieveProductDetail()"/>
    </template>
    <Container v-else-if="productStore.product">
      <div class="product-wrapper">
        <div class="product-images-wrapper">
          <div class="current-image">
            <img :src="productStore.product.images[0]" :alt="productStore.product.name" />
          </div>
        </div>
        <div class="product-info">
          <div class="tags mb-20">
            <span v-for="tag in productStore.product.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <h1 class="mb-32">{{ productStore.product.name }}</h1>
          <p class="mb-20">{{ productStore.product.description }}</p>
          
          <div v-if="productStore.product.variations" class="variation-wrapper pv-12 mb-20">
            <div class="mb-12">Variation</div>
            <div v-for="(variation, index) in productStore.product.variations" :key="index" class="variation-item mr-8 mb-8">
              <input 
                type="radio" 
                :id="`variation-${index}`" 
                :name="`variations`" 
                :value="variation" 
                v-model="selectedVariation" 
                style="display: none;"
              />
              <div
                class="variation-box"
                :class="{ active: selectedVariation === variation }" 
                @click="selectedVariation = variation"
              >
                <label :for="`variation-${index}`">{{ variation }}</label>
              </div>
            </div>
          </div>
          <p class="price mb-12">{{ productStore.product.price }}$</p>
          <button class="add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import Container from '~/components/Container.vue';
import { useRoute } from 'vue-router';

// store
const route = useRoute();
const productStore = useProductStore();

// reactive data
const selectedVariation = ref(null);

// cycle
onMounted(() => {
  retrieveProductDetail();
});

// methods
function retrieveProductDetail() {
  const id = route.params.id;
  productStore.fetchProductDetail(id);
}
</script>

<style scoped lang="scss">
.loader {
  margin: 30vh auto 0 auto;
}

.product-wrapper {
  display: flex;
  justify-content: space-between;

  .product-images-wrapper {
    flex: 40%;

    .current-image {
      width: 100%;
      border-radius: 10px;

      img {
        width: 100%;
      }
    }
  }

  .product-info {
    flex: 60%;
    padding-left: 50px;
  }

  .variation-wrapper {
    border-top: solid 1px #dfe6e9;
    border-bottom: solid 1px #dfe6e9;
    
    .variation-item {
      display: inline-block;

      .variation-box {
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.3s, border-color 0.3s;

        * {
          cursor: pointer;
        }

        &.active {
          background-color: var(--primary-color);

          * {
            color: var(--secondary-color);
          }
        }
      }
    }
  }

  .price {
    font-size: 20px;
  }

  .add-to-cart {
    padding: 10px 20px;
    border: solid 1px #1289A7;
    border-radius: 5px;
    transition: background-color 0.3s;
    cursor: pointer;
    background-color: #1289A7;
    color: var(--secondary-color);
  }
}
</style>
