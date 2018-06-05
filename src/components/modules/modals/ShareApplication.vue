<template>
  	<modal 	:name="name"
           	@before-open="beforeOpen"
           	@before-close="beforeClose"
        	:height="'auto'">

		<button class="button__icon button__secondary" @click="closeModal()">
  			<i class="material-icons">close</i>
  		</button>


		<div class="top">
			<i class="material-icons">mail</i>
			<h1>Compartilhe essa aplicação</h1>
		</div>

		<div class="middle">
			<div class="description">
				Informe o e-mail para enviar o link da aplicação, apenas usuários corporativos poderão acessar o link.
			</div>

			<div class="form">
				<input type="text" class="textfield size--full" placeholder="Ex.: usuario@tvglobo.com.br">
		  		<button class="button button__primary">
		  			Enviar
		  		</button>
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
