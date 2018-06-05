<template>
	<modal 	:name="name"
         	@before-open="beforeOpen"
         	@before-close="beforeClose"
          :clickToClose="false"
          :reset="true"
      	:height="'auto'">
    <div class="content">
      <div class="top">
        <i class="material-icons">cloud_upload</i>
        <h2>Publicação</h2>
      </div>

      <div class="middle">
        <div class="description">
          <strong>Deseja publicar a versão {{artifact ? artifact.version : ''}} em produção?</strong>
         </div>
      </div>

      <div class="footer">
        <button class="button button__secondary" @click="closeModal()">
          <i class="material-icons">close</i>Cancelar
        </button>

        <button class="button button__primary" @click="setProduction()">
          <i class="material-icons">check</i>Sim, desejo publicar
        </button>
      </div>
    </div>
	</modal>
</template>

<script>
export default {
  props: {
    name: { type: String},
  },
  data() {
    return {
      artifact: null,
    }
  },
  methods: {
    closeModal() {
      this.$modal.hide(this.name);
    },
    async setProduction() {
      try {
        await this.$store.dispatch("setProductionArtifact", this.artifact);
        this.closeModal();
      } catch(error) {
        console.error(error);
        this.closeModal();
      }
    },
    resetData() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    beforeOpen(event) {
      this.$store.dispatch("freezeContent");
      this.artifact = event.params.artifact;
    },
    beforeClose() {
      this.$store.dispatch("unFreezeContent");
      this.resetData();
    }
  }
}

</script>
