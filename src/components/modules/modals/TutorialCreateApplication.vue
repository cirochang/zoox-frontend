<template>
	<modal :name="name"
          @before-open="beforeOpen"
          @before-close="beforeClose"
        	:height="'auto'">

			<button class="button__icon button__secondary" @click="closeModal()">
  			<i class="material-icons">close</i>
  		</button>


		<div class="tutorialBox" :class="boxCssClass">
			<div class="top">
				<div class="iconeTutorial">
					<img :src="steps[currentStep].imgSrc">
				</div>
				<h2>{{steps[currentStep].title}}</h2>
			</div>

			<div class="middle">
				<div class="description" v-html="steps[currentStep].description">
				</div>

				<ul class="steps">
					<li v-for="stepNum in (steps.length)" :class="{'active': currentStep === (stepNum - 1)}"></li>
				</ul>

				<div class="description botoes">
          			<button v-if="currentStep > 0" class="button button__secondary" @click="backStep()">
						<i class="material-icons">arrow_back</i>Anterior
					</button>

					<button v-if="currentStep < (steps.length - 1)" class="button button__primary" @click="nextStep()">
						<i class="material-icons">arrow_forward</i>Próximo
					</button>

          			<button v-if="currentStep >= (steps.length - 1)" class="button button__primary" @click="finishTutorial()">
            			<i class="material-icons">check</i>Entendi
					</button>
				</div>
			</div>
		</div>

	</modal>
</template>

<script>
import tutoIlustration from '@/assets/img/tutorial-illustration.svg';
import saveIlustration from '@/assets/img/save-illustration.svg';
import artefatosIlustration from '@/assets/img/artefatos-illustration.svg';

export default {
  props: ['name'],
  data() {
    return {
      currentStep: 0,
      boxCssClass: {
        'left': false,
        'right': false
      },
      steps: [
        {
          title: 'Visão Geral',
          imgSrc: tutoIlustration,
          description: 'Preencha as informações de cadastro da aplicação como <strong>nome</strong>, <strong>área responsável</strong> e uma breve <strong>descrição</strong> das funcionalidades. <br /><br />Faça o upload do <strong>ícone</strong> do app e de alguns exemplos de <strong>telas</strong>. Esses dados são importantes para que sua aplicação esteja na GloboStore :)'
        },
        {
          title: 'Salvar Rascunho',
          imgSrc: saveIlustration,
          description: 'Quando todas as informações da <strong>Visão Geral</strong> forem preenchidas, o botão de <strong>salvar</strong> será habilitado. <br /><br />Clique nele para salvar sua aplicação como rascunho e seguir para a tela de upload dos artefatos.'
        },
        {
          title: 'Upload de Artefatos',
          imgSrc: artefatosIlustration,
          description: 'O último passo é subir os artefatos da aplicação. Você pode enviar .apk (android) e .ipa (iOS), controlar o versionamento e ter o histórico de todas as aplicações enviadas. <br /><br />Basta navegar entre as abas na parte direita da tela :)'
        },
      ]
    }
  },
  methods: {
    finishTutorial(){
      this.$store.dispatch("seeTutorial");
      this.closeModal();
    },
    closeModal() {
      this.$modal.hide(this.name);
    },
    nextStep() {
      this.boxCssClass.right = false;
	  this.boxCssClass.left = false;
      setTimeout(() => {
        this.currentStep += 1;
        this.boxCssClass.right = true;
      }, 100);
    },
    backStep() {
      this.boxCssClass.left = false;
	  this.boxCssClass.right = false;
      setTimeout(() => {
        this.currentStep -= 1;
        this.boxCssClass.left = true;
      }, 100);
    },
    beforeOpen() {
      this.$store.dispatch("freezeContent");
    },
    beforeClose() {
      this.$store.dispatch("unFreezeContent");
    }
  }
}

</script>
