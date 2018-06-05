<template>
  <div class="last-artifacts">
    <div class="box">
      <div class="navheader">
        <h1>Meus Aplicativos</h1>
        <div class="buttons__owner">
          <button class="button button__secondary" @click="goToApplicationList()">
            <i class="material-icons">apps</i>Acessar Catálogo
          </button>
          <button class="button button__primary" @click="goToCreateApplication()">
            <i class="material-icons">file_upload</i>Novo Aplicativo
          </button>
        </div>
      </div>
    </div>
    <v-loader v-if="applications === null">
    </v-loader>
    <div v-else-if="applications.length === 0" class="box">
      <div class="panel">
        <div  class="emptyState">
          <div class="section">
            <i class="material-icons">hourglass_empty</i>
            <h1>Vamos começar?</h1>
          </div>
          <div class="section">
            <div class="description">
              Clique no botão destacado logo acima desse painel para cadastrar sua aplicação e publicar na GloboStore :)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="box">
      <div class="panel">
        <!-- TABELA -->
        <table cellpadding="0" cellspacing="0" class="table table--applications">
          <!-- TABLE HEADER -->
          <thead>
            <tr>
              <th>Nome</th>
              <th>Plataforma</th>
              <th>Versão</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <!-- TABLE BODY -->
          <tbody>
            <!-- ITEM -->
            <tr v-for="(app, index) in applications" v-on:mouseover="showActions(index)"
            v-on:mouseout="hideActions(index)">
            <!-- HOVER OPTIONS -->
            <div class="actions" :class="{'actions--hide': showingAction !== index}">
              <div class="options">
                <router-link :to="{name: 'EditApplication', params: {'id': app.id}}">
                  <i class="material-icons">edit</i>
                </router-link>
                <a>
                  <i @click="openDeleteAppModal(app)" class="material-icons">delete</i>
                </a>
              </div>
            </div>
            <td>{{app.name}}</td>
            <td>
              <span class="android--version">
                {{hasOs(app, 'android') ? app.currentVersions.android.minOsVersionRequirement : '---'}}
              </span>

              <span class="ios--version">
                {{hasOs(app, 'ios') ? app.currentVersions.ios.minOsVersionRequirement : '---'}}
              </span>
            </td>
            <td>
              <span class="version">
                {{hasOs(app, 'android') ? app.currentVersions.android.version : '---'}}
              </span>
              <span class="version">
                {{hasOs(app, 'ios') ? app.currentVersions.ios.version : '---'}}
              </span>
            </td>
            <td>
              <span class="status" :class="{'status--draft': hasOs(app, 'ios'), 'status--published': !hasOs(app, 'ios')}">
                {{hasOs(app, 'ios') ? 'Publicado' : 'Rascunho'}}
              </span>
              <span class="status" :class="{'status--draft': hasOs(app, 'android'), 'status--published': !hasOs(app, 'android')}">
                {{hasOs(app, 'android') ? 'Publicado' : 'Rascunho'}}
              </span>
            </td>
            <td><a href=""><i class="material-icons">more_horiz</i></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <v-delete-app :name="'DeleteItem'" :isItem="true" :returnFeedback="returnFeedback"></v-delete-app>
</div>

</template>

<script>
import {mapGetters} from 'vuex';
import Loader from '@/components/modules/Loader.vue';
import _ from 'lodash';
import DeleteItem from '@/components/modules/modals/DeleteItem.vue';

export default {
  components: {
    'v-loader': Loader,
    'v-delete-app': DeleteItem,
  },
  data() {
    return {
      showingAction: null, //number of table that is showing actions
    }
  },
  methods: {
    goToEditApplication(applicationId) {
      this.$router.push({name: 'EditApplication', params: {'id': applicationId}});
    },
    hideActions(index) {
      this.showingAction = null;
    },
    showActions(index) {
      this.showingAction = index;
    },
    async returnFeedback(accept, app){
      if(accept){
        this.$store.dispatch("freezeContent");
        let response = await this.$store.dispatch("deleteApplication", app.id)
        console.log(response);
        await this.$store.dispatch("getMyApplications");
        this.$store.dispatch("unFreezeContent");
      }
    },
    openDeleteAppModal(app) {
      this.$modal.show("DeleteItem", { 'item': app });
    },
    goToCreateApplication() {
      this.$router.push({ name: 'CreateApplication'});
    },
    goToApplicationList() {
      this.$router.push({ name: 'ApplicationsList'});
    },
    getStatusCss(application, os) {
      const status = this.getStatus(application, os);
      return {
        "status--published": status === 'publicado',
        "status--waiting": status === 'aguardando',
        "status--draft": status === 'rascunho',
      }
    },
    hasOs(application, os) {
      return !!_.get(application, `currentVersions[${os}]`)
    },
    getStatus(application, os) {
      const currentVersionId = _.get(application, `application.currentVersions[${os}].id`);
      const lastVersionId = _.get(application, `application.lastVersions[${os}].id`);
      if (!currentVersionId)
        return 'rascunho';
      if (currentVersionId === lastVersionId)
        return 'publicado';
      return 'aguardando';
    }
  },
  computed: {
    ...mapGetters(['applications']),
  },
  beforeMount() {
    this.$store.dispatch("getMyApplications");
  }
}
</script>
