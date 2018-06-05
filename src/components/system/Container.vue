<template>
  <div class="container">
    <div class="primaryOverlay" :class="overlayCssClass"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['currentUser','isContentFreeze']),
    overlayCssClass() {
      return {
        "primaryOverlay--show": this.isContentFreeze,
        "primaryOverlay--hide": !this.isContentFreeze
      }
    }
  }
}
</script>
