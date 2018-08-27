<template>
  <section class="content">
    <div class="box box-default">
      <div class="box-header with-border">
        <h3 class="box-title">States Table</h3>
        <div class="box-tools pull-right">
        </div>
      </div>
      <div class="box-body">
        <router-link :to="{name: 'Create State'}">
          <a class="btn btn-app">
            <i class="fa fa-plus"></i> Create New State
          </a>
        </router-link>
        <div class="row">
          <div class="col-xs-12 table-responsive">
            <div class="input-group" style="width: 400px;"> <!--Sorry for put css inline haha =) -->
              
              <input type="text" v-model="search.term" name="q" class="form-control" placeholder="Search..." v-on:input="refreshStates()">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat" v-on:click='refreshStates()'>
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>

            <div class="checkbox">
              <label for="drop-remove">
                <input type="checkbox" id="drop-remove" v-model="search.isReverse" @change="refreshStates()">
                Reverse
              </label>
            </div>
          
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Abbreviation</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="state in states">
                <td>{{state.name}}</td>
                <td>{{state.abbreviation}}</td>
                <td>{{formatDate(state.createdAt)}}</td>
                <td>{{formatDate(state.updatedAt)}}</td>
                <td>
                  <div class="btn-group">
                    <router-link tag="button" :to="{name: 'Edit State', params: { stateId: state._id }}" type="button" class="btn btn-warning">Edit</router-link>
                    <button type="button" class="btn btn-danger" v-on:click='removeState(state)'>Remove</button>
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
      states: {},
      search: {
        term: "",
        isReverse: false,
      },  
    }
  },
  methods: {
    formatDate(date) {
      return Moment(date).locale('pt-br').format('LLLL');
    },
    refreshStates() {
      Api.getStates(this.search).then(response => {
        this.states = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    removeState(state) {
      swal({
        title: "Are you sure?",
        text: `Do you want to remove the ${state.name} state?`,
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true,
        },
      })
      .then(willDelete => {
        if (willDelete) {
          Api.deleteState(state._id).then(response => {
            this.$notify({
              group: 'system',
              title: `Deleted!`,
              text: `The state was removed!`
            });
            this.refreshStates();
          })
          .catch(error => {
            console.error(error);
          })
        }
      });
    }
  },
  beforeMount: function () {
    this.refreshStates();
  },
}
</script>