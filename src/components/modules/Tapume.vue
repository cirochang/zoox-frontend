<template>
  <div class="tapume">

    <div class="top">
      <!-- <i class="material-icons">{{icon}}</i> -->
      <!-- <img src="@/assets/img/tv-colorbar-illustration.svg"> -->
      <img :src="icon">
      <h1>{{title}}</h1>

      <div class="description">
        <slot></slot>
      </div>
			<button type="button" @click="goToHome()" class="button button__primary"><i class="material-icons">apps</i>Acessar Catálogo</button>
		</div>

		<!-- BOTAO FULL (MOBILE) -->
		<div class="bottom">
			<button type="button" @click="goToHome()" class="button button__primary"><i class="material-icons">apps</i>Acessar Catálogo</button>
		</div>

    <div class="texture"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => 'Ooops!'
    },
    icon: {
      type: String,
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'ApplicationsList'});
    }
  }
}
</script>
