<template>
  <section class="content">
    <div class="box box-default">
      <div class="box-header with-border">
        <h3 class="box-title">Cities Table</h3>
        <div class="box-tools pull-right">
        </div>
      </div>
      <div class="box-body">
        <router-link :to="{name: 'Create City'}">
          <a class="btn btn-app">
            <i class="fa fa-plus"></i> Create New City
          </a>
        </router-link>
        <div class="row">
          <div class="col-xs-12 table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>State Id</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="city in cities">
                <td>{{city.name}}</td>
                <td>{{city.stateId}}</td>
                <td>
                    <div class="btn-group">
                    <router-link tag="button" :to="{name: 'Edit City', params: { cityId: city._id }}" type="button" class="btn btn-warning">Edit</router-link>
                    <button type="button" class="btn btn-danger" v-on:click='removeCity(city)'>Remove</button>
                    </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Api from '@/api';
import Moment from 'moment';

export default {
  data() {
    return {
      cities: {},    
    }
  },
  methods: {
    formatDate(date) {
        return Moment(date).locale('pt-br');
    },
    refreshCities() {
      Api.getCities().then(response => {
        this.cities = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    removeCity(city) {
      swal({
        title: "Are you sure?",
        text: `Do you want to remove the ${city.name} city?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      })
      .then(willDelete => {
        if (willDelete) {
          Api.deleteCity(city._id).then(response => {
            this.$notify({
              group: 'system',
              title: `Deleted!`,
              text: `The city was removed!`
            });
            this.refreshCities();
          })
          .catch(error => {
            console.error(error);
          })
        }
      });
    }
  },
  beforeMount: function () {
    this.refreshCities();
  },
}
</script>