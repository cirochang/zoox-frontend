<template>
  	<modal 	:name="name"
           	@before-open="beforeOpen"
           	@before-close="beforeClose"
        	:height="'auto'">

		<button class="button__icon button__secondary" @click="closeModal()">
  			<i class="material-icons">close</i>
  		</button>

    <div class="content">
  		<div class="top">
  			<i class="material-icons">person_pin</i>
  			<h1>Utilize seu login corporativo</h1>
  		</div>

  		<div class="middle">
  			<div class="description">
  				Informe seu email e senha de rede (TV GLOBO) para efetuar o login. Precisando de ajuda, ligue para o Help Desk.
        </div>

        <div class="description">
          <a href="#">Ligue para <span>3911</span> se estiver na Globo</a>
          <a href="tel:08007284855">Se estiver fora, ligue para <span>0800 728 4855</span></a>
        </div>
  		</div>
    </div>

  	</modal>
</template>

<script>
export default {
  props: ['name'],
  methods: {
    closeModal() {
      this.$modal.hide(this.name);
    },
    beforeOpen() {
      this.$store.dispatch("freezeContent");
    },
    beforeClose() {
      this.$store.dispatch("unFreezeContent");
    }
  }
}

</script>
