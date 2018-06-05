<template>

  <div class="applications-list">

    <div class="box">
      <div class="navheader">
        <h1 v-if="searchTerm">Busca por "{{searchTerm}}"</h1>
        <h1 v-else>Lista de Aplicativos</h1>


        <div class="buttons__owner">
          <button class="button button__secondary" v-if="currentUser && isManager" @click="goToMyApplications()">
            <i class="material-icons">store</i>Gerenciar Aplicações
          </button>
        </div>


        <div class="combo">
          <i class="material-icons">tune</i>
          <v-custom-select :id="'osFilter'"
                           :data="[{value: 'hide', label: 'Filtrar por'},
                                   {value: '', label: 'Todos'},
                                   {value: 'android', label: 'Android'},
                                   {value: 'ios', label: 'iOS'}]"
                            @onSelect="filterByOs">
          </v-custom-select>
        </div>

        <div class="navheader__mobileOptions">
          <a href="#" :class="{active : !cards.isListView}">
            <i class="material-icons" @click="cardsBlockView()">apps</i>
          </a>

          <a href="#" :class="{active : cards.isListView}">
            <i class="material-icons" @click="cardsListView()">reorder</i>
          </a>

        </div>

      </div>
    </div>

    <v-loader v-if="applications === null">
    </v-loader>

    <div v-else class="box">

    <!-- EMPTY APPLICATIONS-->
    <div v-if="applications.length === 0" class="box full">
     <div class="panel">
        <div  class="emptyState">
           <div class="section">
              <i class="material-icons">find_in_page</i>
              <h1>Oooops!</h1>
           </div>
           <div class="section">
              <div class="description">
                 {{($route.query && $route.query.os)
                    ? 'Não encontramos nenhum resultado para o seu filtro. Tente filtrar por outros sistemas operacionais ou clique no botão abaixo para acessar o catálogo.'
                    : 'Não encontramos nenhum resultado para sua busca. Tente pesquisar por outros termos ou clique no botão abaixo para acessar o catálogo.'
                 }}
              </div>
              <div class="description">
                 <button @click="goToHome()" class="button button__primary">
                 <i class="material-icons">apps</i>Acessar Catálogo
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>

    <ul v-else class="cards" :class="{'cards--list': cards.isListView}">
      <v-card v-for="app in applications"
              :key="app.id"
              :id="app.id"
              :name="app.name"
              :category="app.category"
              :hasIos="!!app.currentVersions.ios"
              :hasAndroid="!!app.currentVersions.android"
              :thumbUri="app.images.thumb"></v-card>
    </ul>
    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';
import Card from '@/components/modules/Card.vue';
import CustomSelect from '@/components/modules/CustomSelect.vue';
import Loader from '@/components/modules/Loader.vue';

export default {
  components: {
    'v-card': Card,
    'v-custom-select': CustomSelect,
    'v-loader': Loader
  },
  data() {
    return {
      searchTerm: '',
      bottom: false,
      page: 1,
      limitPerPage: 24,
      cards: {
        isListView: false
      }
    }
  },
  computed: mapGetters(['applications', 'currentUser', 'isManager']),
  methods: {
    goToMyApplications() {
      this.$router.push({name: "MyApplications"});
    },
    cardsBlockView() {
      this.cards.isListView = false;
    },
    cardsListView() {
      this.cards.isListView = true;
    },
    filterByOs(os) {
      const query = { ...this.$route.query, os, };
      this.$router.push({ name: 'ApplicationsList' , query });
    },
    goToHome() {
      this.$router.push({ name: 'ApplicationsList'});
    },
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight - 400
      return bottomOfPage || pageHeight < visible
    }
  },
  created() {
    const vm = this;
    window.addEventListener('scroll', () => {
      vm.bottom = this.bottomVisible();
    });
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        this.searchTerm = query.search;
        query.limit = this.limitPerPage;
        this.$store.dispatch("getApplications", query);
      }
    },
    bottom: {
      // Infinity scroll
      handler(newVal) {
        if(newVal && this.applications.length >= (this.limitPerPage * this.page)) {
          this.page += 1;
          const query = {...this.$store.query, page: this.page, limit: this.limitPerPage}
          this.$store.dispatch("getMoreApplications", query);
        }
      }
    },
  }
}
</script>
