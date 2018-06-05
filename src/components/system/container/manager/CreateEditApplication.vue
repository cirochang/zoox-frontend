<template>
  <div class="create-application">
  	<div class="box">
      <div class="navheader">
        <h1><router-link :to="{name: 'MyApplications'}">
          Meus Aplicativos
        </router-link> > {{$route.params.id ? 'Editar' : 'Adicionar'}} Aplicativo</h1>
        <div class="tabs">
          <ul>
            <li><a :class="{'active': tabSelected === 'general'}" @click="showTab('general')"><i class="material-icons">settings</i> Visão Geral</a></li>
            <li><a :class="{'active': tabSelected === 'android', 'disabled': !currentApplication}" @click="showTab('android')"><i class="material-icons">phone_android</i> Upload Android</a></li>
            <li><a :class="{'active': tabSelected === 'ios', 'disabled': !currentApplication}" @click="showTab('ios')"><i class="material-icons">phone_iphone</i> Upload iOS</a></li>
          </ul>
        </div>
      </div>
    </div>

    <general v-show="tabSelected === 'general'" :tabSelected="tabSelected" ></general>
    <artifacts-android v-if="currentApplication && currentApplication.id" v-show="tabSelected === 'android'" :os="'android'" :tabSelected="tabSelected" ></artifacts-android>
    <artifacts-ios v-if="currentApplication && currentApplication.id" v-show="tabSelected === 'ios'" :os="'ios'" :tabSelected="tabSelected" ></artifacts-ios>
    <v-tutorial-create-application :name="'tutorialCreateApplication'"></v-tutorial-create-application>

    </div>


  </div>
</template>

<script>
import General from './createEdit/General.vue';
import Artifacts from './createEdit/Artifacts.vue';
import {mapGetters} from 'vuex';
import TutorialCreateApplication from '@/components/modules/modals/TutorialCreateApplication.vue';


export default {
  components: {
    'general': General,
    'artifacts-android': Artifacts,
    'artifacts-ios': Artifacts,
    'v-tutorial-create-application': TutorialCreateApplication,
  },
  data() {
    return {
      tabSelected: 'general'
    }
  },
  methods: {
    showTab(tabName, canChangeTab) {
      this.tabSelected = tabName;
    },
    goToApplicationList() {
      this.$router.push({ name: 'ApplicationsList'});
    },
    goToMyApplications() {
      this.$router.push({ name: 'MyApplications'});
    },
    openModal(name) {
      this.$modal.show(name);
    },
  },
  created() {
    this.$store.dispatch("clearCurrentApplication");
    // Get Application if applicationId has passed in querystring
    if(this.$route.params.id) {
      this.$store.dispatch("getApplicationById", this.$route.params.id);
      this.$store.dispatch("getArtifacts", this.$route.params.id);
    }
  },
  mounted() {
    // Open tutorial
    const vm = this;
    if(!this.$route.params.id && (this.currentUser && this.currentUser.showTutorial))
      new Promise(resolve => setTimeout(() =>
        vm.openModal('tutorialCreateApplication')
      , 500));
  },
  computed: {
    ...mapGetters(['currentApplication', 'currentUser', 'artifacts']),
  }
}
</script>
