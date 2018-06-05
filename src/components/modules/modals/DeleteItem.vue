<template>
	<modal 	:name="name"
         	@before-open="beforeOpen"
         	@before-close="beforeClose"
          :clickToClose="false"
          :reset="true"
          :isItem="true"
      	:height="'auto'">
    <div class="content">
      <div class="top">
        <i class="material-icons">delete</i>
        <h2>Remover</h2>
      </div>

      <div class="middle">
        <div class="description">
          Deseja realmente remover {{isItem ? ' o item ' : ' a versão '}}{{item ? item.name? item.name : item.version : ''}}? <br /><strong>Essa ação não poderá ser desfeita.</strong>
         </div>
      </div>

      <div class="footer">
        <button @click="closeModal(false)" class="button button__secondary">
          <i  class="material-icons">close</i>Não, desejo manter
        </button>

        <button @click="closeModal(true, item)" class="button button__primary">
          <i class="material-icons">check</i>Sim, desejo remover
        </button>
      </div>
    </div>
	</modal>
</template>

<script>
export default {
  props: {
    name: { type: String},
    isItem: { type: Boolean},
    returnFeedback: {type: Function}
  },
  data() {
    return {
      item: null,
    }
  },
  methods: {
    closeModal(response, i) {
      this.$modal.hide(this.name);
      this.returnFeedback(response, i);
    },
    resetData() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    beforeOpen(event) {
      this.$store.dispatch("freezeContent");
      this.item = event.params.item;
    },
    beforeClose() {
      this.$store.dispatch("unFreezeContent");
      this.resetData();
    }
  }
}

</script>
