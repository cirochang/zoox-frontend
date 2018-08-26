<template>
  <div id='side-bar'>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">Main</li>
          <li class="treeview" v-bind:class="{ active: hasUrlPath('states', 1)}">
            <router-link :to="{name: 'States'}">
              <i class="fa fa-map"></i> <span>States</span>
            </router-link>
          </li>
          <li class="treeview" v-bind:class="{ active: hasUrlPath('cities', 1)}">
            <router-link :to="{name: 'Cities'}">
              <i class="fa fa-map"></i> <span>Cities</span>
            </router-link>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  methods: {
    hasUrlPath(path_name, path_index) {
      return path_name == this.$route.fullPath.split("/")[path_index];
    }
  },
}
</script>