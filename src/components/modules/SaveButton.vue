<template>
  <div class="fav__button" :class="{'fav__button--disabled': isDisabled}">

    <!-- UMA DIV SÓ RECEBENDO OS DIFERENTES STATUS // PARA FAZER FADEOUT, BASTA ADICIONAR A CLASSE .fav__feedback--fadeout -->

    <!-- FEEDBACK SUCCESS -->
    <div v-if="state === SUCESS" class="fav__feedback fav__feedback--success">
      <i class="material-icons">check</i>
    </div>

    <!-- FEEDBACK ERROR -->
    <div v-if="state === ERROR" class="fav__feedback fav__feedback--error">
      <i class="material-icons">error</i>

      <div class="validation__msg">
        {{errorMsg}}
      </div>
    </div>

    <!-- FEEDBACK SAVING -->
    <div v-if="state === SAVING" class="fav__feedback fav__feedback--saving">
      <i class="material-icons">save</i>
    </div>

    <button @click="save()" class="button button__primary button--icon" :class="{'expand': (isExpanded && state === DEFAULT)}">
        <span>Salvar</span>
        <i class="material-icons">save</i>
    </button>

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
    },
    state: {
      type: String,
      default: () => 'default',
    },
    forceDisabled: {
      type: Boolean,
      default: () => false,
    },
    errorMsg: {
      type: String,
      default: () => 'Um erro inesperado ocorreu. Por favor contacte o suporte.'
    }
  },
  data() {
    return {
      DEFAULT: "default",
      SUCESS: "success",
      SAVING: "saving",
      LOADING: "loading",
      ERROR: "error",
      isExpanded: false,
    }
  },
  computed: {
    isDisabled() {
      return (this.forceDisabled || this.state !== this.DEFAULT);
    }
  },
  methods: {
    save() {
      if(!this.isDisabled)
        this.$emit('clickSave');
    },
    async animateExpand() {
      await new Promise(resolve => setTimeout(resolve, 100));
      this.isExpanded = true;
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.isExpanded = false;
    }
  },
  watch: {
    isDisabled: {
      immediate: true,
      handler(isDisabled) {
        // Animate expanding save button when is enable.
        if(!isDisabled) {
          this.animateExpand();
        }
      }
    }
  }
}
</script>
