<template>

  <div class="sidebar" :class="sideBarCssClass">
    <div class="sidebar__overlay"></div>

    <!-- SIDEBAR MENU -->
    <div class="sidebar__menu">

      <!-- HEADER -->
      <div class="menu__header">
        <div class="user__avatar">
          <i class="material-icons">person</i>
        </div>

        <div class="user__content" v-if="currentUser">
          <div class="content__name">{{currentUser.name}}</div>
          <div class="content__email">{{currentUser.email}}</div>
        </div>

        <a href="#">
          <i class="material-icons" @click="closeSideBar()">arrow_back</i>
        </a>

      </div>
      <!-- fim do header - sidebar -->

      <!-- MENU -->
      <ul class="menu__content">

        <li class="content__item">
          <a href="#">
            <i class="material-icons">apps</i> Catálogo
          </a>
        </li>

        <li class="content__item">
          <a @click="logout()">
            <i class="material-icons">power_settings_new</i> Sair
          </a>
        </li>

      </ul>

      <div class="menu__footer">
        <img src="@/assets/img/logotipoAplicacoesTecnologiaWhite.svg" alt="Diretoria de Aplicações - Tecnologia" title="Diretoria de Aplicações - Tecnologia">
      </div>

    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';


export default {
  computed: {
    ...mapGetters(['isSideBarOpen', 'currentUser']),
    sideBarCssClass() {
      return {
        "sideBar--open": this.isSideBarOpen,
        "sideBar--close": !this.isSideBarOpen
      }
    }
  },
  methods: {
    closeSideBar() {
      this.$store.dispatch("closeSideBar");
    },
    logout() {
      this.closeSideBar();
      this.$store.dispatch("logout");
    },
  }
}
</script>
