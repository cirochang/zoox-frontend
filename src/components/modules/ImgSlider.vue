<template>
  <carousel v-if="showSlider"
            :perPage="1"
            :minSwipeDistance="90"
            :perPageCustom="[[340, 2], [740, 2], [980, 3], [1380, 5]]"
            :paginationColor="'#CCCCCC'"
            :paginationActiveColor="'#FFFFFF'"
            :paginationPadding="4">
    <slide v-for="(img, index) in imgs" :key="index">
      <img v-lazy="img"/>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  data() {
    return {
      widthScreen: 0,
      renderTimer: 0
    }
  },
  props: {
    id: {
      type: String,
      default: () => Math.random().toString(36).substring(7)
    },
    imgs: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      showSlider: true
    }
  },
  methods: {
    handleWindowResize(event) {
      // Hide the slider and show after 0.5 secconds.
      if(this.widthScreen != $(window).width()){
        this.widthScreen = $(window).width();
        let vm = this;
        vm.showSlider = false;
        clearTimeout(this.renderTimer);
        this.renderTimer = setTimeout(() => {vm.showSlider = true}, 500);
      }
    },
  },
  mounted() {
    // This lib has a bug that not render correctly when
    // the screen is resized. So we need to re-render when this happen.
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this. handleWindowResize)
  },
}

</script>
