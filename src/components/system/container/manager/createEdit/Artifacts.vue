<template>

  <div class="box">
    <div v-if="artifacts && artifacts.length > 0" class="fav__button">
      <button @click="inputAddThumb()" class="button button__primary button--icon" :class="{'expand': isExpanded}">
        <span>Upload</span>
        <i class="material-icons">file_upload</i>
      </button>
    </div>
    <div v-if="artifacts && artifacts.length === 0" class="panel">
      <div  class="emptyState">
        <div class="section">
          <i class="material-icons">hourglass_empty</i>
          <h1>Ainda não temos o {{osFileExtension}}</h1>
        </div>
        <div class="section">
          <div class="description">
            Suba o arquivo {{osFileExtension}} para criar a primeira versão e publicar na loja, utilize o botão abaixo para fazer o upload da aplicação.
          </div>
          <div class="description">
            <button class="button button__primary" @click="inputAddThumb()">
              <i class="material-icons">file_upload</i>Upload {{os}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- fim do emptyState //////////////////////////////////////////////////////////////////////// -->
    <div v-else class="panel">
      <!--
      <div class="column--full"><div class="top"><div class="item"><div class="combo"><i class="material-icons">tune</i><v-custom-select :id="`select-${this.os}`"
      :data="[
      {value: null, label: 'Filtrar por'},
      {value: null, label: 'Todos'},
      {value: 'publicado', label: 'Publicado'},
      {value: 'aguardando', label: 'Aguardando'},
      {value: 'arquivado', label: 'Arquivado'}]"
      @onSelect="filterByStatus"></v-custom-select></div></div><div class="item"><button class="button button__primary" @click="inputAddThumb()"><i class="material-icons">file_upload</i>Nova Versão
    </button></div></div></div>
  -->
  <div class="column--full">
    <!-- TABELA -->
    <table cellpadding="0" cellspacing="0" class="table table--applications">
      <!-- TABLE HEADER -->
      <thead>
        <tr>
          <th>Package Name</th>
          <th>Versão</th>
          <th>Data de Atualização</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <!-- TABLE BODY -->
      <tbody>
        <!-- ITEM -->
        <tr v-for="(artifact, index) in artifactsShowing" v-on:mouseover="showActions(index)"
        v-on:mouseout="hideActions(index)" >
        <!-- HOVER OPTIONS -->
        <div class="actions" :class="{'actions--hide': showingAction !== index}">
          <div class="options">
            <a v-show="getStatus(artifact) !== 'publicado' " >
              <i @click="openSetProductionArtifactModal(artifact)" class="material-icons">file_upload</i>
            </a>
            <a :href="artifact.download" download>
              <i class="material-icons">file_download</i>
            </a>
            <a>
              <i @click="openDeleteItemModal(artifact)" class="material-icons">delete</i>
            </a>
          </div>
        </div>
        <td>{{artifact.packageName}}</td>
        <td>{{artifact.version}}</td>
        <td>{{timestampToDate(artifact.updatedAt)}}</td>
        <td>
          <span class="status" :class="getStatusCss(artifact)">
            {{getStatus(artifact)}}
          </span>
        </td>
        <td>
          <a href="">
            <i class="material-icons">more_horiz</i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>


  <!-- PAINEL DE HOMOLOG -->
  <div class="navheader noMargin">
    <h1>Homologação</h1>
  </div>
    <div class="panel">
      <div  class="emptyState">
        <div class="section">
          <i class="material-icons">watch_later</i>
          <h1>Deseja subir uma versão de homologação?</h1>
        </div>
        <div class="section">
          <div class="description">
            Suba um arquivo .apk de homologação e vamos gerar um link que poderá ser distribuído para os usuários. Esse link será válido por 30 dias.
          </div>
          <div class="description">
            <button class="button button__secondary">
              <i class="material-icons">file_upload</i>Upload Homologação
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- PAINEL DE HOMOLOG COM LINK VÁLIDO -->
    <!-- <div class="navheader noMargin">
      <h1>Homologação</h1>
    </div>
      <div class="panel">
        <div  class="emptyState">
          <div class="section">
            <i class="material-icons">watch_later</i>
            <h1><a href="#">https://goo.gl/xvTX2z</a></h1>
          </div>
          <div class="section">
            <div class="description">
              Esse link expira em <strong>30 dias</strong>.
            </div>
            <div class="description">
              <button class="button button__secondary">
                <i class="material-icons">content_copy</i>Copiar Link
              </button>

              <button class="button button__secondary">
                <i class="material-icons">email</i>Enviar
              </button>

              <button class="button button__secondary">
                <i class="material-icons">update</i>Atualizar
              </button>
            </div>
          </div>
        </div>
      </div> -->



<!-- FIM DO PANEL -->
<input v-show="false" type="file" ref="addFile" @change="addFile" :accept="osFileExtension"></input>
<v-upload-artifact :name="'uploadArtifact'" :file="file" :os="os" ></v-upload-artifact>
<v-set-production-artifact :name="'setProductionArtifact'"></v-set-production-artifact>
<v-delete-artifact :name="'DeleteItem'" :isItem="false" :returnFeedback="returnFeedback"></v-delete-artifact>
</div>


</template>

<script>
import {mapGetters} from 'vuex';
import CustomSelect from '@/components/modules/CustomSelect.vue';
import UploadArtifact from '@/components/modules/modals/UploadArtifact.vue'
import SetProductionArtifact from '@/components/modules/modals/SetProductionArtifact.vue';
import DeleteItem from '@/components/modules/modals/DeleteItem.vue';
import moment from 'moment';
import _ from 'lodash';

export default {
  components: {
    'v-custom-select': CustomSelect,
    'v-upload-artifact': UploadArtifact,
    'v-set-production-artifact': SetProductionArtifact,
    'v-delete-artifact': DeleteItem,
  },
  props: {
    tabSelected: {
      type: String, //android or ios
      required: true
    },
    os: {
      type: String, //android or ios
      required: true
    },
  },
  data() {
    return {
      showingAction: null, //number of table that is showing actions
      file: null,
      filterStatus: null,
      isExpanded: false,
    }
  },
  methods: {
    filterByStatus(status) {
      this.filterStatus = status;
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("DD/MM/YY - kk:mm");
    },
    inputAddThumb() {
      this.$refs.addFile.click();
    },
    openSetProductionArtifactModal(artifact) {
      this.$modal.show("setProductionArtifact", { artifact });
    },
    openDeleteItemModal(item) {
      this.$modal.show("DeleteItem", { 'item': item });
    },
    async returnFeedback(accept, item) {
      if(accept){
        this.$store.dispatch("freezeContent");
        let response = await this.$store.dispatch("deleteArtifact", item.id)
        console.log(response);
        await this.$store.dispatch("getArtifacts", this.currentApplication.id);
        this.$store.dispatch("unFreezeContent");
      }
    },
    addFile(event) {
      this.file = this.$refs.addFile.files[0];
      event.target.value = null;
      this.$modal.show("uploadArtifact");
    },
    sortBy(columnName) {
      //sort artifact by some column (if the sort not change then reverse)
      let artifactsSorted = _.sortBy(this.artifactsShowing, columnName);
      if(JSON.stringify(artifactsSorted) == JSON.stringify(this.artifactsShowing)){
        this.artifactsShowing = artifactsSorted.reverse();
      }else {
        this.artifactsShowing = artifactsSorted;
      }
    },
    hideActions(index) {
      this.showingAction = null;
    },
    showActions(index) {
      this.showingAction = index;
    },
    getStatusCss(artifact) {
      const status = this.getStatus(artifact);
      return {
        "status--published": status === 'publicado',
        "status--waiting": status === 'aguardando',
        "status--archived": status === 'arquivado',
      }
    },
    getStatus(artifact) {
      const currentVersion = _.get(this.currentApplication, `currentVersions[${this.os}]`);
      if(currentVersion) {
        if (currentVersion.id === artifact.id)
          return 'publicado';
        if (artifact.updatedAt > currentVersion.updatedAt)
          return 'aguardando';
        return 'arquivado';
      } else {
        return 'aguardando';
      }
    },
    async animateExpand() {
      await new Promise(resolve => setTimeout(resolve, 100));
      this.isExpanded = true;
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.isExpanded = false;
    }
    /*
    getStatus(artifact) {
    if (artifact.id === this.currentVersionId)
    return 'publicado';
    if (artifact.id === this.lastVersionId)
    return 'aguardando';
    return 'arquivado'
  }
  */
  },
  computed: {
    ...mapGetters(['currentApplication']),
    lastVersionId() {
      const lastVersions = this.currentApplication.lastVersions;
      return (lastVersions && lastVersions[this.os])
      ? lastVersions[this.os].id
      : null
    },
    currentVersionId() {
      const currentVersions = this.currentApplication.currentVersions;
      return (currentVersions && currentVersions[this.os])
      ? currentVersions[this.os].id
      : null
    },
    artifacts() {
      return this.$store.getters.artifacts(this.os);
    },
    artifactsShowing() {
      if(!this.artifacts)
        return null;
      return (this.filterStatus)
      ? this.artifacts.slice().filter(artifact => this.getStatus(artifact) === this.filterStatus).reverse()
      : this.artifacts.slice().reverse()
    },
    osFileExtension() {
      return (this.os === "android" ? ".apk" : ".ipa");
    }
  },
  watch: {
    tabSelected: {
      handler(tabSelected) {
        // Add proprieties from application (only edit page).
        if(tabSelected === this.os)
        this.animateExpand();
      }
    }
  }
}


</script>
