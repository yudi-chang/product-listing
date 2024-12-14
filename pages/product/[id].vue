<template>
  <div>
    <div v-if="productStore.isLoading" class="loader"></div>
    <template v-else-if="productStore.isErrorFetching">
      <ErrorMessage @retry-fetch="retrieveProductDetail()"/>
    </template>
    <Container v-else-if="productStore.product">
      <div class="product-wrapper">
        <div class="product-images-wrapper">
          <swiper :pagination="true" :modules="modules" :spaceBetween="15" class="mySwiper">
            <swiper-slide v-for="(image, index) in productStore.product.images" :key="index">
              <img :src="image" alt="Product Image" />
            </swiper-slide>
          </swiper>
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
          <div class="product-bottom-section">
            <p class="price mb-12">{{ productStore.product.price }}$</p>
            <button class="add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// store
const route = useRoute();
const productStore = useProductStore();

// reactive data
const selectedVariation = ref(null);

// others
const modules = [Pagination];

// cycle
onMounted(() => {
  retrieveProductDetail();
});

// methods
const retrieveProductDetail = () => {
  const id = route.params.id;
  productStore.fetchProductDetail(id);
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.loader {
  margin: 30vh auto 0 auto;
}

.product-wrapper {
  display: flex;
  justify-content: space-between;

  .product-images-wrapper {
    flex: 40%;
    width: 40%;
  }

  .product-info {
    flex: 60%;
    width: 60%;
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

// carousel css
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: $breakpoint-lg) {
  .product-wrapper {

    .product-images-wrapper {
      flex: 50%;
      width: 50%;
    }

    .product-info {
      flex: 50%;
      width: 50%;
      padding-left: 35px;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .product-wrapper {
    display: block;

    .product-images-wrapper {
      width: 100%;
    }

    .product-info {
      width: 100%;
      padding: 20px 0;
    }

    .product-bottom-section {
      display: flex;
      width: 100%;
      align-items: center;

      .price {
        flex: 0 1 auto;
        padding-right: 20px;
        margin: 0;
      }

      .add-to-cart { 
        flex: 1;
      }
    }
  }
}

@media (max-width: $breakpoint-sm) {
}
</style>
