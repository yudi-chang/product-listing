<template>
  <div class="error-message">
    <img src="/images/error-logo.png" alt="Unexpected error image" />
    <h2 class="mb-12">Oops something went wrong</h2>
    <div class="message">An unexpected error has occured. please try again or contact support if the error persists</div>
    <button @click="retry()" class="mt-20">
      Try again
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['retry-fetch'])

function retry() {
  emit('retry-fetch');
}
</script>

<style scoped lang="scss">
.error-message {
  text-align: center;
  width: 100%;
  padding: 100px 20px 0 20px;

  img {
    max-width: 100%;
  }
}

.message {
  width: 500px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
}

button {
  width: 250px;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 10px 20px;
  max-width: 100%;
  cursor: pointer;
  border: none;
  font-size: 17px;

  &:hover {
    background-color: var(--primary-hover);
  }
}
</style>
