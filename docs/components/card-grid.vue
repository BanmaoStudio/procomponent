<template>
  <div class="card-grid">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 1.5rem;
}
</style>
