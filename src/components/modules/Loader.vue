<template>
  <div class="loaderPage">
    <!-- Loader -->
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="10" fill="none" stroke-width="1.6" stroke-miterlimit="16"/>
    </svg>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch("freezeContent");
  },
  beforeDestroy() {
    this.$store.dispatch("unFreezeContent");
  }
}
</script>
