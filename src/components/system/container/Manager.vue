<template>

  <div class="my-applications">

    <div v-if="currentUser && isManager" class="applications-manager">
      <!-- ONLY DESKTOP CAN ACESS -->
      <tapume :icon="img403">
        As funcionalidades de gerenciamento e upload de aplicações não estão disponíveis na versão mobile.<br /><br />Por favor, acesse a <span>GloboStore</span> através de um dispositivo desktop para realizar suas ações.
      </tapume>
      <!-- END ONLY DESKTOP CAN ACESS -->
      <router-view></router-view>
    </div>

    <div v-else>
      <tapume :icon="img403">
        O seu usuário não possui permissão para acessar essa página. Por favor, clique no botão abaixo para voltar ao catálogo.
      </tapume>
    </div>

  </div>
</template>

<script>
import Tapume from '@/components/modules/Tapume.vue';
import img403 from '@/assets/img/barrier-illustration.svg';

import {mapGetters} from 'vuex';

export default {
  components: {
    'tapume': Tapume
  },
  data() {
    return {
      img403,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isManager'])
  }
}
</script>
