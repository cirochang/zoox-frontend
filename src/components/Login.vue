<template>
  <div id="v-login" class="login">

    <v-pre-loader v-show="!pageIsLoaded">
    </v-pre-loader>

    <div class="overlay">
       <!-- FORM -->
       <form @submit.prevent="login()" data-toggle="validator" class="login__box" :class="{'login__box--loader': isLoginPending}">

          <div class="login__box__brand">
            <div class="login__box__brand--simbolo">
              <img src="@/assets/img/simbolo.svg">
            </div>

            <div class="login__box__brand--logotipo">
              <img src="@/assets/img/logotipoWhite.svg">
            </div>
          </div>

          <div class="login__box__item">
            <input @keyup.enter="login()" class="textfield" @focus="closeValidation()" :class="{'textfield--error': hadWrongCredentials}" autocapitalize="off" autocomplete="off" type="email" placeholder="Entre com seu e-mail cadastrado" v-model="credentials.email">
            <i class="material-icons">person</i>
          </div>

          <div class="login__box__item">
            <input @keyup.enter="login()" class="textfield" @focus="closeValidation()" :class="{'textfield--error': hadWrongCredentials}" :type="showPassword ? 'text' : 'password'" placeholder="Informe sua senha" v-model="credentials.password">
            <i class="material-icons">lock</i>
            <i class="material-icons showPassword" v-if="showPassword" @click="toggleShowPassword()">visibility</i>
            <i class="material-icons hidePassword" v-if="!showPassword" @click="toggleShowPassword()">visibility_off</i>
          </div>

          <div class="login__box__item">

            <div class="validation--msg"
               :class="{'validation--hide': !isValidationOpen, 'validation--show': isValidationShow}">
            <a @click="closeValidation()"><i class="material-icons">close</i></a>
              Ooops! {{errorMsg}}
            </div>
            <button class="button button__primary" type="submit">
              Entrar
              <!-- Loader -->
              <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="10" fill="none" stroke-width="1.6" stroke-miterlimit="16"/>
              </svg>
            </button>
          </div>

          <div class="login__box__item" @click="openModal('needHelp')">
            <a href="#">Precisa de ajuda para entrar?</a>
          </div>

          <div class="footer">
            <img src="@/assets/img/logotipoAplicacoesTecnologiaWhite.svg" alt="Diretoria de Aplicações - Tecnologia" title="Diretoria de Aplicações - Tecnologia">
          </div>

       </form>
     </div>
     <!-- FIM DO OVERLAY -->

     <v-need-help :name="'needHelp'"></v-need-help>
   </div>
</template>

<script>
import PreLoader from '@/components/modules/PreLoader.vue'
import NeedHelp from '@/components/modules/modals/NeedHelp.vue';

import {mapGetters} from 'vuex';

export default {
  components: {
    'v-pre-loader': PreLoader,
    'v-need-help': NeedHelp,
  },
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      pageIsLoaded: false,
      isValidationOpen: false,
      isValidationShow: false, // background animation of validation (poor variable name)
      timerToHideValidation: null,
      errorMsg: null,
      hadWrongCredentials: false,
      isLoginPending: false,
      showPassword: false,
    }
  },
  methods: {
    openModal(name) {
      this.$modal.show(name);
    },
    async login() {
      this.isLoginPending = true;
      try {
        await this.$store.dispatch("login", this.credentials);
      } catch ({ response }) {
        this.hadWrongCredentials =
          (response && (response.status === 401 || response.status === 422))
        if(this.hadWrongCredentials) {
          this.errorMsg = "Usuário ou senha inválidos. Por favor, verifique suas credenciais e tente novamente :)";
          this.credentials.password = "";
        } else {
          this.errorMsg = "Tivemos um problema no servidor. Por favor, entre em contato com o suporte :)";
        }
        this.animateValidationBox();
      } finally {
        this.isLoginPending = false;
      }
    },
    toggleShowPassword(){
      this.showPassword = !this.showPassword;
    },
    openValidation() {
      this.isValidationOpen = true;
    },
    closeValidation() {
      this.isValidationOpen = false;
      this.hadWrongCredentials = false;
    },
    animateValidationBox() {
      // Show the validation box -> start gradient animation -> close
      this.openValidation();
      clearTimeout(this.timerToHideValidation);
      this.isValidationShow = true;
      setTimeout(() =>{
        this.isValidationShow = false;
        this.timerToHideValidation = setTimeout(() => {
           this.closeValidation();
        }, 6000);
      }, 750);
    }
  },
  created() {
    // Finish the pre loader after some seconds
    setTimeout(() => this.pageIsLoaded = true, 800);
  },
}
</script>
