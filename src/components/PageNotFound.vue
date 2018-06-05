<template>
  	<!-- TAPUME - Funcionalidades apenas para desktop -->
    <tapume :icon="img404" >
      A página que você procura não existe ou não está mais acessível. Por favor, clique no botão abaixo para voltar ao catálogo.
    </tapume>
</template>

<script>
import Tapume from '@/components/modules/Tapume.vue';
import img404 from '@/assets/img/tv-colorbar-illustration.svg';

export default {
  components: {
    'tapume': Tapume
  },
  data() {
    return {
      img404
    }
  }
}
</script>
