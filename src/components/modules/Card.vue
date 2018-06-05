<template>
  <li class="cards__card">
    <router-link :to="{name: 'Application', params: {'id': id}}">
      <div class="card__thumb">
        <img v-lazy="thumbUri">
      </div>

      <div class="card__content">
        <div class="card__title">{{name}}</div>
        <div class="card__subtitle">{{category}}</div>
        <div class="card__options">
          <div v-show="hasIos"
               class="options__tag options__tag--ios">iOS</div>
          <div v-show="hasAndroid"
               class="options__tag options__tag--android">Android</div>
          <a href="#" class="link--noMotion"><i class="material-icons">open_in_new</i></a>

        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['id', 'thumbUri', 'name', 'category', 'hasIos', 'hasAndroid'],
}

</script>
