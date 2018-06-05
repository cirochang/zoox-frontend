<template>
  	<modal 	:name="name"
           	@before-open="beforeOpen"
           	@before-close="beforeClose"
            :clickToClose="false"
            :reset="true"
        	:height="'auto'">

    <div class="content" v-show="step === STEP_CONFIG_VERSION">
  		<div class="top">
  			<!-- <i class="material-icons">settings_applications</i> -->
        <h3>Configurações da Versão</h3>
  		</div>
  		<div class="middle">
        <div class="column--full">

          <div class="item small">
              <h1>Versão</h1>
              <input type="text" v-model="artifact.version" class="textfield" placeholder="1.0.0">
          </div>

          <div class="item medium">
              <h1>OS Mínimo</h1>
              <input type="text" class="textfield" v-model="artifact.minOsVersionRequirement" placeholder="Android 4">
          </div>

          <div class="item big">
              <h1>Nome do Pacote</h1>
              <input type="text" class="textfield" v-model="artifact.packageName" placeholder="com.exemplo.ola.android">
          </div>

          <div class="item full">
            <h1>Publicar em Produção</h1>
            <ul>
                <li>
                    <input v-model="isProduction" class="styled-radio" id="option-1" type="radio" value="true">
                    <label for="option-1">Sim</label>
                </li>
                <li>
                    <input v-model="isProduction" class="styled-radio" id="option-2" type="radio" value="">
                    <label for="option-2">Não</label>
                </li>
            </ul>
          </div>

          <div v-if="!!lastArtifact" class="item full">
            <h1>Novidades</h1>
            <textarea class="textfield" v-model="artifact.description" placeholder="Descreva as novidades dessa versão"></textarea>
          </div>
        </div>
  		</div>

      <div class="footer">
        <button class="button button__secondary" @click="closeModal()">
          <i class="material-icons">close</i>Cancelar
        </button>

        <button class="button button__primary" :class="{'disabled': isSendButtonEnabled}"@click="send()">
          <i class="material-icons">cloud_upload</i>Enviar
        </button>
      </div>
    </div>

    <!-- CONTENT PROGRESS BAR -->
    <div class="content" v-show="step === STEP_UPLOADING">
      <div class="top">
        <i class="material-icons">cloud_upload</i>
        <h1>{{file ? file.name : ''}}</h1>
      </div>
      <div class="middle">
        <div class="upload__bar">
          <div class="upload__progress" :style="{ width: `${uploadProgress}%`}"></div>
        </div>
        <div class="description">
          {{ (uploadProgress === 100)
                ? 'Quase lá, aguarde só mais alguns instantes...'
                : 'Enviando pacote, por favor aguarde alguns instantes :)' }}
        </div>
      </div>
    </div>

    <!-- ERRO -->

    <div class="content" v-show="step === STEP_ERROR">
      <div class="top">
        <i class="material-icons">sentiment_very_dissatisfied</i>
        <h2>Oooops!</h2>
      </div>

      <div class="middle">
        <div class="description">Tivemos um problema nos servidores, por favor, tente novamente.</div>
      </div>

      <div class="footer">
        <button class="button button__secondary" @click="closeModal()">
          <i class="material-icons">close</i>Cancelar
        </button>

        <button class="button button__primary" @click="send()">
          <i class="material-icons">cloud_upload</i>Sim, quero tentar novamente
        </button>
      </div>
    </div>

    <!-- SUCESSO PROD -->

    <div class="content" v-show="step === STEP_SUCCESS">
      <div class="top">
        <i class="material-icons">sentiment_very_satisfied</i>
        <h2>Sucesso!</h2>
      </div>

      <div class="middle">
        <div class="description">
          Sua versão foi armazenada com sucesso em nossos servidores!
          <span v-show="isProduction">Percebemos que você optou por publicar em produção, essa ação vai exibir essa versão na loja. Deseja prosseguir?</span>
         </div>
      </div>

      <div v-if="isProduction" class="footer">
        <button class="button button__secondary" @click="closeModal()">
          <i class="material-icons">close</i>Não, desejo aguardar
        </button>

        <button class="button button__primary" @click="setProduction()">
          <i class="material-icons">check</i>Sim, desejo publicar
        </button>
      </div>
      <div v-else class="footer">
        <button class="button button__primary" @click="closeModal()">
          <i class="material-icons">check</i>Entendi
        </button>
      </div>
    </div>
  	</modal>
</template>

<script>
import CustomSelect from '@/components/modules/CustomSelect.vue';
import {mapGetters} from 'vuex';

export default {
  props: ['name', 'os', 'file'],
  components: {
    'v-custom-select': CustomSelect
  },
  data() {
    return {
      STEP_CONFIG_VERSION: 0,
      STEP_UPLOADING: 1,
      STEP_SUCCESS: 2,
      STEP_ERROR: 3,
      step: 0,
      isProduction: "",
      artifact: {
        id: null,
        packageName: "",
        version: "1.0.0",
        description: "",
        minOsVersionRequirement: "",
        applicationId: null,
      }
    }
  },
  methods: {
    closeModal() {
      this.$modal.hide(this.name);
    },
    async send() {
      try {
        this.artifact.os = this.os;
        this.artifact.applicationId = this.currentApplication.id;
        this.artifact.file = this.file;
        this.step = this.STEP_UPLOADING;
        await this.$store.dispatch("saveArtifact", this.artifact);
        this.step = this.STEP_SUCCESS;
      } catch(error) {
        this.step = this.STEP_ERROR;
        console.error(error);
        this.closeModal();
      }
    },
    async setProduction() {
      try {
        await this.$store.dispatch("setProductionArtifact", this.lastArtifact);
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
      if(!!this.lastArtifact) {
        this.artifact =  {
          ...this.artifact,
          version: this.lastArtifact.version,
          minOsVersionRequirement: this.lastArtifact.minOsVersionRequirement,
          packageName: this.lastArtifact.packageName
        };
      }
    },
    beforeClose() {
      this.$store.dispatch("unFreezeContent");
      this.resetData();
    }
  },
  computed: {
    ...mapGetters(['currentApplication', 'uploadProgress']),
    lastArtifact() {
      const artifacts = this.$store.getters.artifacts(this.os);
      return (artifacts && artifacts.length > 0)
        ? artifacts[artifacts.length - 1]
        : null;
    },
    isSendButtonEnabled() {
      return (this.artifact.os && this.artifact.packageName &&
        this.artifact.version && this.artifact.minOsVersionRequirement)
    }
  }
}

</script>
