<template>
   <!-- Main content -->
   <section class="content">
      <div class="box box-primary">
         <div class="box-header with-border">
            <h3 class="box-title">Form</h3>
         </div>
         <!-- /.box-header -->
         <div class="box-body">
            <div class="row">
               <div class="col-md-6">
                  <div class="form-group" v-bind:class="{'has-error': errors.name }">
                     <label for="exampleInputEmail1">Name*</label>
                     <input type="name" v-model="city.name" class="form-control" placeholder="Ex: Rio de Janeiro">
                     <span class="help-block" v-if='errors.name'>{{errors.name.message}}</span>
                  </div>
                  <div class="form-group" v-bind:class="{'has-error': errors.stateId }">
                     <label>State*</label>
                     <select class="form-control" v-model="city.stateId">
                        <option v-for="state in states" v-bind:value="state._id" v-bind:key="state._id">{{state.name}}</option>
                     </select>
                     <span class="help-block" v-if='errors.stateId'>{{errors.stateId.message}}</span>
                  </div>
               </div>
               <!-- /.col -->
            </div>
            <!-- /.row -->
         </div>
         <!-- /.box-body -->
         <div class="box-footer">
           <button type="submit" v-on:click="createNewCity()" class="btn btn-primary">Create</button>
         </div>
      </div>
   </section>

</template>

<script>
import Api from '@/api';
import swal from 'sweetalert';

export default {
    data() {
        return {
            city: {},
            states: {},
            errors: {},
        }
    },
    methods: {
        createNewCity() {
            Api.createCity(this.city).then(response => {
                this.$notify({
                    group: 'system',
                    title: `New City created`,
                    text: `The city ${this.city.name} was created!`
                });
                this.$router.push("/cities");
            }).catch(err => {
                console.log(err);
                this.errors = err.response.data;
            })
        },
    },
    beforeMount() {
        Api.getStates().then(response => {
            this.states = response.data;
        }).catch(err => {
            console.log(err);
            this.$notify({
              group: 'system',
              type: 'error',
              title: `Error`,
              text: `Error to communicate with api.`
            });
            this.$router.push("/cities");
        })
    }
}
</script>