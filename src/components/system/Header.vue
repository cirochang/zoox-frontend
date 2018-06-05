<template>
  <div id="header" class="header" v-bind:class="{'header--smaller': headerIsSmaller}">

    <div v-show="!filterIsHide" class="filter" id="filter">

      <div class="filter__title">Filtrar por</div>
      <a href="#">Android</a>
      <a href="#">iOS</a>

    </div>

    <div class="header__mobileSearch"
         :class="searchBar.cssClass">
      <a href="#">
        <i class="material-icons" @click="closeSearchBar()">arrow_back</i>
      </a>
      <input type='search' @keyup.enter="goToSearch()" v-model="search" placeholder="Pesquisar por aplicativo..." class="searchMobile size--full">
      <a @click="goToSearch()" href="#">
        <i class="material-icons">search</i>
      </a>
    </div>

  	<div class="header__brand" v-bind:class="brandCssClass">
        <a href="#">
          <i class="material-icons" @click="openSideBar()">menu</i>
        </a>
  			<div class="brand__icon" @mouseover="brandMouseOver()"
                                 @mouseleave="brandMouseLeave()">
        <router-link :to="{name: 'ApplicationsList'}">
          <img src="@/assets/img/simbolo.svg">
        </router-link>
  			</div>
        <div class="brand__icon--white">
          <router-link :to="{name: 'ApplicationsList'}">
            <img src="@/assets/img/simboloWhite.svg">
          </router-link>
        </div>
  			<div class="brand__logotipo" v-bind:class="logoCssClass">
          <img src="@/assets/img/logotipo.svg">
        </div>
  	</div>

  	<div class="header__search size--medium">
  		<input type='search' v-model="search" @keyup.enter="goToSearch()" class="search size--full" placeholder="Pesquisar...">
  		<button @click="goToSearch()" class="button__icon">
  			<i class="material-icons">search</i>
  		</button>
  	</div>

  	<div class="header__user" v-if="currentUser">
  		<div class="user__name">Olá, <span>{{currentUser.name}}</span></div>
  		<div class="user__avatar">
  			<i class="material-icons">person</i>
  		</div>
  	</div>

  	<div class="header__options">
  		<a @click="logout()">
  			<i class="material-icons">power_settings_new</i>
  		</a>
  	</div>

    <div class="header__mobileActions">
      <a v-show="hasFilterButton">
        <i class="material-icons" :class="{active: !filterIsHide}" @click="showFilter($event)">
          tune
        </i>
      </a>
      <router-link v-show="hasHomeButton" :to="{name: 'ApplicationsList'}">
        <i class="material-icons">arrow_back</i>
      </router-link>
      <a href="#">
        <i class="material-icons" @click="openSearchBar()">search</i>
      </a>
    </div>

  </div>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      search: '',
      animationLoadingTime: 900,
      headerIsSmaller: false,
      filterIsHide: true,
      lastScrollTop: 0,
      deltaScroll: 5,
      brand: {
        mouseIsOver: false,
        isExpanded: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isSearchBarOpen']),
    hasFilterButton() {
      return this.$route.name === 'ApplicationsList';
    },
    hasHomeButton() {
      return this.$route.name === 'Application';
    },
    searchBar() {
      return {
        isOpen: this.isSearchBarOpen,
        cssClass: {
          "header__mobileSearch--show": this.isSearchBarOpen,
          "header__mobileSearch--hide": !this.isSearchBarOpen
        }
      }
    },
    brandCssClass() {
      return {
        "header__brand--bigger": this.brand.isExpanded,
        "header__brand--smaller": !this.brand.isExpanded
      }
    },
    logoCssClass() {
      return {
        "brand__logo--fadeIn": this.brand.isExpanded,
        "brand__logo--fadeOut": !this.brand.isExpanded
      }
    }
  },
  methods: {
    goToSearch() {
      const query = { search: this.search };
      this.closeSearchBar();
      this.$router.push({ name: 'ApplicationsList' , query});
    },
    logout() {
      this.$store.dispatch("logout");
    },
    openSideBar() {
      this.$store.dispatch("openSideBar");
    },
    openSearchBar() {
      this.$store.dispatch("openSearchBar");
    },
    closeSearchBar() {
      this.$store.dispatch("closeSearchBar");
    },
    brandMouseOver() {
      if(!this.brand.mouseIsOver){
        this.brand.mouseIsOver = true;
        this.animateBrand();
      }
    },
    brandMouseLeave() {
      this.brand.mouseIsOver = false;
    },
    hideFilter() {
      $('body').off('click');
      this.filterIsHide = true;
    },
    showFilter(event) {
      event.stopPropagation();
      this.filterIsHide = false;
      let vm = this;
      // When click in any part of body outside the filter, close the filter
      $('body').click(function(e) {
        if (e.target.id !== "filter" && !$(e.target).parents("#filter").length) {
          vm.hideFilter();
        }
      });
    },
    selectAndroidFilter() {
      this.hideFilter();
    },
    selectIosFilter() {
      this.hideFilter();
    },
    animateBrand() {
      // Expand the brand and auto close after 2 seconds (if mouse is out).
      this.brand.isExpanded = true;
      setTimeout(() => {
        if(this.brand.mouseIsOver){
          this.animateBrand();
        }else{
          this.brand.isExpanded = false;
        }
      }, 2000)
    },
    handleScroll (event) {
      // Check if needs hide the header based in scroll
      let st = $(document).scrollTop();
      // If on top, show the header
      if(st === 0)
        return this.headerIsSmaller = false;
      // Make sure they scroll more than delta
      if(Math.abs(this.lastScrollTop - st) <= this.deltaScroll)
          return;
      // If they scrolled down and are past the header, set headerSmaller true
      // This is necessary so you never see what is "behind" the header.
      if (st > this.lastScrollTop && st > 32){
        // Scroll Down
        this.headerIsSmaller = true;
      } else if(st + $(window).height() < $(document).height()){
        // Scroll Up
        this.headerIsSmaller = false;
      }
      this.lastScrollTop = st;
    }
  },
  beforeMount() {
    // Animate the brand when the view is loaded.
    setTimeout(() => {this.animateBrand();}, this.animationLoadingTime);
  },
  created () {
    // Start listener for scroll events
    $(document).bind('scroll', this.handleScroll);
  },
  destroyed () {
    // Destroy listener fofr scroll events
    $(document).unbind('scroll');
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        // Auto add search if is in route path
        if(this.$route.path === '/')
          this.search = query.search;
      }
    }
  }
}
</script>
