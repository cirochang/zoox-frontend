<template>
  <div class="wrapper">
    <notifications group="system" />
    <v-header></v-header>
    <v-side-bar></v-side-bar>
    <v-container></v-container>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from './system/Header.vue'
import SideBar from './system/SideBar.vue'
import Footer from './system/Footer.vue'
import Container from './system/Container.vue'
export default {
  components: {
    'v-header': Header,
    'v-side-bar': SideBar,
    'v-footer': Footer,
    'v-container': Container
  },
}
</script>