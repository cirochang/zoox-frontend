<template>

  <v-page-not-found v-if="currentApplication === undefined"></v-page-not-found>
  <v-loader v-else-if="!currentApplication">
  </v-loader>

  <div class="application" v-else>

    <div class="box">
      <div class="navheader gradient">
        <h1><router-link :to="{name: 'ApplicationsList'}">
          Catálogo
        </router-link> > Downloads</h1>
      </div>
    </div>

    <div class="box">

		<div class="panel">

			<div class="panel__column panel__column--full">

				<!-- COVER -->
				<div class="panel__cover">

					<div class="panel__thumb">
						<img id="thumb" v-lazy="currentApplication.images.thumb" />
					</div>

					<div class="panel__content">
						<h1>{{currentApplication.name}}</h1>
						<h2><i class="material-icons">local_activity</i>
              				{{currentApplication.category}}
            			</h2>

						<div class="content__buttons">

						  	<a @click="openModal('shareApplication')">
					    		<i class="material-icons">mail</i>
					    	</a>

						    <button type="button" @click="openModal('smsDownload')"
                        class="button button__primary">Download</button>

						</div>


						<div class="panel__divisor"></div>



						<div class="panel__tags">

							<div class="panel__tags--os">
								<div v-if="hasOs('ios')" class="tags__item tags__item--iOS">
                  <span>Dispostivos</span> {{currentApplication.currentVersions.ios.minOsVersionRequirement}}
                </div>
								<div v-if="hasOs('android')" class="tags__item tags__item--android">
                  <span>Dispostivos</span> {{currentApplication.currentVersions.android.minOsVersionRequirement}}
                </div>
							</div>

							<div class="panel__tags--version">
								<div v-if="hasOs('ios')" class="tags__item tags__item">
                  Versão Ios <span>{{currentApplication.currentVersions.ios.version}}</span>
                </div>
                <div v-if="hasOs('android')" class="tags__item tags__item">
                  Versão Android <span>{{currentApplication.currentVersions.android.version}}</span>
                </div>
								<div class="tags__item tags__item">Atualizado em <span>
                  {{timestampToDate(currentApplication.updatedAt)}}
                </span></div>
							</div>

						</div>

					</div>

				</div>
				<!-- FIM DO COVER -->


				<!-- VERSION : MOBILE -->

				<div class="panel__tags--mobile">
					<div v-if="hasOs('ios')" class="tags__item">
            Versão Ios <span>{{currentApplication.currentVersions.ios.version}}</span><i class="material-icons">phonelink_setup</i>
          </div>
          <div v-if="hasOs('ios')" class="tags__item">
            Versão Android <span>{{currentApplication.currentVersions.android.version}}</span><i class="material-icons">phonelink_setup</i>
          </div>
					<div class="tags__item">Atualizado em
            <span>{{timestampToDate(currentApplication.updatedAt)}}</span>
            <i class="material-icons">date_range</i></div>
				</div>

				<!-- DESCRIPTION -->
				<div class="panel__description">

					<h1><i class="material-icons">format_quote</i>Descrição</h1>
					<div class="description__text">
            	{{currentApplication.description}}
					</div>
				</div>

				<!-- NEWS -->
				<div class="panel__news"
          v-if="(hasOs('android') && currentApplication.currentVersions.android.description)
                || (hasOs('ios') && currentApplication.currentVersions.ios.description)">

					<h1><i class="material-icons">star</i>Novidades</h1>
					<div class="news__text">
            <span v-if="hasOs('android') && currentApplication.currentVersions.android.description">
              ANDROID - {{currentApplication.currentVersions.android.description}}
            </span>
            <span v-if="hasOs('ios') && currentApplication.currentVersions.ios.description">
              IOS - {{currentApplication.currentVersions.ios.description}}
            </span>
					</div>
				</div>


			</div>
			<!-- fim da coluna esquerda -->
		</div>

		<div class="panel">
			<div class="panel__column panel__column--full">

				<div class="panel__screens">

					<h1><i class="material-icons">image</i>Telas da Aplicação</h1>

					<!-- INSERT CAROUSEL HERE -->
					<div class="screens__carousel">
						<v-img-slider v-if="currentApplication"
					    	:imgs="currentApplication.images.screenshots.slice(0,5)">
					    </v-img-slider>
					</div>
				</div>

			</div>


			<!-- BOTAO FULL (MOBILE) -->
			<div class="buttonMobile">
				<button type="button" @click="downloadArtifact()" class="button button__primary">Download</button>
			</div>

		</div>
		<!-- fim do panel -->
    </div>

		<div class="coverHead gradient--default"
        v-bind:style="{'background-image': coverColors}">
			<div class="texture"></div>
    	<div class="cover__overlay"></div>
    </div>

    <a v-show="false" ref="downloadAndroid" :href="getDownloadUri('android')"></a>
    <v-sms-download :name="'smsDownload'"></v-sms-download>
    <v-share-application :name="'shareApplication'"></v-share-application>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';
import ImgSlider from '@/components/modules/ImgSlider.vue';
import SmsDownload from '@/components/modules/modals/SmsDownload.vue';
import ShareApplication from '@/components/modules/modals/ShareApplication.vue';
import Loader from '@/components/modules/Loader.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import _ from 'lodash';
import moment from 'moment';

export default {
  components: {
    'v-img-slider': ImgSlider,
    'v-sms-download': SmsDownload,
    'v-share-application': ShareApplication,
    'v-loader': Loader,
    'v-page-not-found': PageNotFound
  },
  computed: {
    ...mapGetters(['currentApplication']),
    coverColors() {
      // Get the most vibrants colors of thumb to make the cover
      if(this.currentApplication) {
        const gradients = this.currentApplication.images.gradients;
        const firstColor = (gradients && gradients.length > 1) ? gradients[0] : null;
        const secondColor = (gradients && gradients.length > 1) ? gradients[1] : null;
        return `linear-gradient(135deg, ${firstColor} 10%, ${secondColor} 100%)`;
      }
    }
  },
  methods: {
    openModal(name) {
      this.$modal.show(name);
    },
    hasOs(os) {
      return !!_.get(this.currentApplication, `currentVersions[${os}]`)
    },
    downloadArtifact() {
      this.$refs.downloadAndroid.click();
    },
    getDownloadUri(os) {
      return _.get(this.currentApplication, `currentVersions[${os}].download`);
    },
    timestampToDate(timestamp) {
      return moment.unix(timestamp).format("DD/MM/YY");
    },
  },
  beforeMount: function() {
    this.$store.dispatch("getApplicationById", this.$route.params.id);
  }
}
</script>
