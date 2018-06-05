<template>

  <div id="v-system">
    <v-pre-loader v-if="!pageIsLoaded">
    </v-pre-loader>
    <div :class="{preload: !pageIsLoaded}" class="system">
      <v-sidebar></v-sidebar>
      <v-header v-if="pageIsLoaded"></v-header>
      <v-container></v-container>
      <div class="footer">
        <img src="@/assets/img/logotipoAplicacoesTecnologia.svg" alt="Diretoria de Aplicações - Tecnologia" title="Diretoria de Aplicações - Tecnologia">
      </div>
    </div>
  </div>

</template>

<script>
import Header from './system/Header.vue';
import Container from './system/Container.vue';
import SideBar from './system/SideBar.vue';
import PreLoader from '@/components/modules/PreLoader.vue';
import {mapGetters} from 'vuex';

export default {
  data() {
      return {
          minPageLoadingTime: 600,
          minPageLoaded: false,
          widthScreen: 0 // browser screen width size
      }
  },
  components: {
    'v-header': Header,
    'v-container': Container,
    'v-sidebar': SideBar,
    'v-pre-loader': PreLoader
  },
  computed: {
    ...mapGetters(['currentUser', 'isContentFreeze', 'isManager']),
    pageIsLoaded() {
      return (this.minPageLoaded && !!this.currentUser);
    }
  },
  methods: {
    minLoadingPage(event) {
      // Minimum load page (needed to fadeout transitions in background)
      this.minPageLoaded = false;
      setTimeout(() => {
        this.minPageLoaded = true;
      }, this.minPageLoadingTime);
    },
    pageResized() {
      // If the page is resized load the page again
      if(Math.abs(this.widthScreen - $(window).width()) > 40){
        this.widthScreen = $(window).width();
        this.minLoadingPage();
      }
    }
  },
  beforeMount() {
    // start to listen resize events and prepare to finish min pre load
    window.addEventListener('resize', this.pageResized);
    this.minLoadingPage();
  },
  beforeDestroy: function () {
    // stop to listen resize events
    window.removeEventListener('resize', this.pageResized);
    this.$store.dispatch("unFreezeContent");
  },
  watch: {
    currentUser: {
      handler(newVal, oldVal) {
        // Go to ApplicationManager view if the user is a manager,
        // is on a desktop and is on root path without any arguments
        if(!oldVal && newVal && this.isManager && $(window).width() > 860 &&
           this.$route.path === "/" && !this.$route.query.searchTerm)
          this.$router.push({ name: 'MyApplications'});
      }
    },
    isContentFreeze: {
      immediate: true,
      handler(newVal) {
        // Add noScroll class to body if is in search mobile mode.
        $('body').toggleClass('noScroll', newVal);
      }
    }
  },
}
</script>
