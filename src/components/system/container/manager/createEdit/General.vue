<template>
  <div class="box" v-else>
      <v-save-button v-if="tabSelected === 'general'" @clickSave="save()" :forceDisabled="isSaveDisabled" :state="saveState" :errorMsg="errorMsg">
      </v-save-button>
      <div class="panel">
          <!-- COLUNA ESQUERDA -->
          <div class="column--left">
              <div class="item">
                  <div class="item__help" :class="thumbInfoBoxCss">
                      <h1>Instruções</h1>
                      <ul>
                          <li>Utilize imagens nos formatos .png ou .jpg</li>
                          <li>Dimensões de 360x360 pixels</li>
                          <li>Evite utilizar imagens com transparência</li>
                      </ul>
                  </div>
                  <h1 @click="save()">Icone
                 <a @mouseover="showThumbInfo()" @mouseleave="hideThumbInfo()">
                 <i class="material-icons">help</i>
                 </a>
              </h1>
                  <div class="thumb" @mouseover="thumbMouseOver()" @mouseleave="thumbMouseLeave()" @click="inputAddThumb()">
                      <div class="thumb__loader">
                          <div class="loader">
                              <svg class="circular" viewBox="25 25 50 50">
                                  <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                              </svg>
                          </div>
                      </div>
                      <div class="overlay" :class="{'overlay--show': isThumbMouseOver}">
                          <button class="button button__primary button--icon">
                              <i v-if="!application.images.thumb" class="material-icons">photo</i>
                              <i v-else class="material-icons">autorenew</i>
                          </button>
                      </div>
                      <img v-if="application.images.thumb" :src="application.images.thumb">
                      <img v-else src="@/assets/img/thumbDefault.png">
                  </div>
              </div>
          </div>
          <!-- COLUNA DIREITA -->
          <div class="column--right">
              <div class="item half">
                  <h1>Nome da Aplicação</h1>
                  <input type="text" class="textfield" placeholder="Informe o nome da aplicação" v-model="application.name">
              </div>
              <div class="item half">
                  <h1>Área Responsável</h1>
                  <input type="text" class="textfield" placeholder="Informe a área responsável pela aplicação" v-model="application.category">
              </div>
              <div class="item">
                  <h1>Descrição</h1>
                  <textarea class="textfield" placeholder="Fale um pouco sobre as características principais da aplicação" v-model="application.description"></textarea>
              </div>
          </div>
          <!-- FIM DA COLUNA DIREITA -->
      </div>
      <!-- FIM DO PANEL -->
      <div class="panel">
          <!-- COLUNA FULL -->
          <div class="column--full">
              <div class="item">
                  <div class="item__help" :class="screenInfoBoxCss">
                      <h1>Instruções</h1>
                      <ul>
                          <li>Utilize imagens nos formatos .png ou .jpg</li>
                          <li>Dimensões de 506 x 900 pixels</li>
                          <li>Evite utilizar imagens com transparência</li>
                          <li>É possível adicionar até 5 telas da aplicação</li>
                      </ul>
                  </div>
                  <h1>Telas da Aplicação
              <a @mouseover="showScreenInfo()" @mouseleave="hideScreenInfo()">
              <i class="material-icons">help</i>
              </a>
           </h1>
                  <div class="screens">
                      <ul>
                          <li v-for="(_, index) in maxFiles" :class="{'active': index <= application.images.screenshots.length}" @mouseover="showScreenActions(index)" @mouseleave="hideScreenActions()">
                              <div @click="inputClick()" v-show="index === application.images.screenshots.length" class="overlay" :class="{'overlay--show': index === indexActionMouseOver}">
                                  <button class="button button__primary button--icon">
                                      <i class="material-icons">photo</i>
                                  </button>
                              </div>
                              <div v-show="(application.images.screenshots.length > index)" class="screens__options" :class="{'screens__options--show': index === indexActionMouseOver,
                       'screens__options--hide': index !== indexActionMouseOver}">
                                  <button class="button button__primary button--icon" @click="deleteFile(index)">
                                      <i class="material-icons">delete</i>
                                  </button>
                                  <button class="button button__primary button--icon" @click="inputChange(index)">
                                      <i class="material-icons">autorenew</i>
                                  </button>
                              </div>
                              <img v-show="application.images.screenshots.length > index" :src="application.images.screenshots[index]" />
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <!-- FIM DA COLUNA FULL -->
      </div>
      <input v-show="false" type="file" ref="addThumb" @change="addThumb" accept="image/x-png,image/jpeg">
      <input v-show="false" type="file" ref="changeFile" @change="changeFile" accept="image/x-png,image/jpeg">
      <input v-show="false" type="file" ref="chooseFiles" @change="addFiles" accept="image/x-png,image/jpeg" multiple>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';
import SaveButton from '@/components/modules/SaveButton.vue';
import _ from 'lodash';

export default {
  components: {
    'v-save-button': SaveButton,
  },
  props: {
    tabSelected: {
      type: String, //android or ios
      required: true
    },
  },
  data() {
    return {
      application: {
        id: null,
        name: null,
        category: null,
        description: null,
        images: {
          thumb: null,
          screenshots: []
        }
      },
      thumbProps: {
        maxWidth: 360, minWidth: 360, maxHeight: 360, minHeight: 360
      },
      screensProps: {
        maxWidth: 506, minWidth: 506, maxHeight: 900, minHeight: 900
      },
      maxFiles: 5,
      indexActionMouseOver: null,
      indexLastAction: null,
      thumbInfoBoxCss: null,
      screenInfoBoxCss: null,
      isThumbMouseOver: false,
      saveState: 'default',
      errorMsg: null,
    }
  },
  methods: {
    showThumbInfo() {
      this.thumbInfoBoxCss = {
        'item__help--show': true,
        'item__help--hide': false,
      }
    },
    hideThumbInfo() {
      this.thumbInfoBoxCss = {
        'item__help--show': false,
        'item__help--hide': true,
      }
    },
    showScreenInfo() {
      this.screenInfoBoxCss = {
        'item__help--show': true,
        'item__help--hide': false,
      }
    },
    hideScreenInfo() {
      this.screenInfoBoxCss = {
        'item__help--show': false,
        'item__help--hide': true,
      }
    },
    thumbMouseOver() {
      this.isThumbMouseOver = true;
    },
    thumbMouseLeave() {
      this.isThumbMouseOver = false;
    },
    showScreenActions(screenIndex) {
      this.indexActionMouseOver = screenIndex;
    },
    hideScreenActions() {
      this.indexActionMouseOver = null;
    },
    inputAddThumb() {
      //Force to click in addThumb input
      this.$refs.addThumb.click();
    },
    inputClick() {
      //Force to click in chooseFiles input
      this.$refs.chooseFiles.click();
    },
    inputChange(index) {
      //Force to click in changeFiles input
      this.indexLastAction = index;
      this.$refs.changeFile.click();
    },
    addThumb(event) {
      // Add or Change thumbFile
      const file = this.$refs.addThumb.files[0];
      this.renderFile(file, this.thumbProps).then((srcFile) => {
        this.application.images.thumb = srcFile;
      });
      event.target.value = null;
    },
    addFiles(event) {
      // Add 1 or more screenshots
      const screenshots = this.application.images.screenshots;
      const files = this.$refs.chooseFiles.files;
      for(let i = 0; (i < files.length) && (screenshots.length < this.maxFiles); i++) {
        this.renderFile(files[i], this.screensProps).then((srcFile) => {
          this.application.images.screenshots.push(srcFile);
        });
      }
      event.target.value = null;
    },
    changeFile(event) {
      // Change screenshot
      const file = this.$refs.changeFile.files[0];
      this.renderFile(file, this.screensProps).then((srcFile) => {
        this.application.images.screenshots[this.indexLastAction] = srcFile;
      });
      event.target.value = null;
    },
    deleteFile(index) {
      // Delete screenshot
      const screenshots = this.application.images.screenshots;
      const leftFiles = screenshots.slice(0, index);
      const rightFiles = screenshots.slice(index + 1, screenshots.length);
      this.application.images.screenshots = leftFiles.concat(rightFiles);
    },
    renderFile(file, {maxWidth, minWidth, maxHeight, minHeight}) {
      // Transform file in to dataUrl
      const vm = this;
      const fileToDataUrl = (file) => {
        return new Promise((resolve, error) =>  {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      }
      const fileToImage = (file) => {
        return new Promise((resolve, error) =>  {
          const _URL = window.URL || window.webkitURL;
          const img = new Image();
          img.onload = function() {resolve(this)};
          img.src = _URL.createObjectURL(file);
        });
      }
      return new Promise(async (resolve, reject) => {
        const img = await fileToImage(file);
        const srcFile = await fileToDataUrl(file);
        const hasValidWidth = (maxWidth <= img.width && minWidth >= img.width)
        const hasValidHeight = (maxHeight <= img.height && minHeight >= img.height)
        return (hasValidWidth && hasValidHeight)
          ? resolve(srcFile)
          : vm.sendErrorMsg(`Por favor utilize imagens com dimensões ${minWidth} x ${minHeight} pixels.`);
      });
    },
    minSleep(startTime, min) {
      // sleep at least some time
      const endTime = new Date().getTime();
      const timeWasted = endTime - startTime;
      return this.sleep(-(timeWasted - min));
    },
    sleep(time) {
      // force sleep
      return new Promise(resolve => setTimeout(resolve, time));
    },
    async sendErrorMsg(msg) {
      // show error msg
      this.saveState = 'error';
      this.errorMsg = msg;
      await this.sleep(10000);
      this.saveState = 'default';
    },
    async sendSuccess() {
      // show success
      this.saveState = 'success';
      await this.sleep(4000);
      this.saveState = 'default';
    },
    async save() {
      // save the application
      this.$store.dispatch("freezeContent");
      this.saveState = 'saving';
      const startTime = new Date().getTime();
      try {
        await this.$store.dispatch("saveApplication", this.application);
        await this.minSleep(startTime, 2000);
        this.sendSuccess();
      } catch ({ response }) {
        await this.minSleep(startTime, 2000);
        this.sendErrorMsg("Ooops, tivemos um problema em salvar suas alterações. Por favor, aguarde alguns instantes e tente novamente.");
      } finally {
        this.$store.dispatch("unFreezeContent");
      }
    },
  },
  computed: {
    ...mapGetters(['currentApplication']),
    isSaveDisabled() {
      const app = this.application;
      return !(app.name && app.category && app.description && app.images &&
               app.images.thumb && app.images.screenshots && app.images.screenshots.length === 5)
    }
  },
  watch: {
    currentApplication: {
      handler(newVal) {
        // Add proprieties from application (only edit page).
        if(newVal)
          this.application = newVal;
      }
    }
  }
}
</script>
