<template>
  	<modal 	:name="name"
        	@before-open="beforeOpen"
       	 	@before-close="beforeClose"
  			:height="'auto'">

		<button class="button__icon button__secondary" @click="closeModal()">
  			<i class="material-icons">close</i>
  		</button>


		<div class="top">
			<i class="material-icons">system_update</i>
			<h1>Download no seu smartphone</h1>
		</div>

		<div class="middle">
			<div class="description">
				Informe o número do seu celular que enviaremos um SMS com o link para download do aplicativo.
			</div>

			<div class="form">
				<input type="text" class="textfield size--full" placeholder="Ex.: +55 21 9 9999 9999">
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
