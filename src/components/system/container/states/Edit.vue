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
                     <input type="name" v-model="state.name" class="form-control" placeholder="Ex: Rio de Janeiro">
                     <span class="help-block" v-if='errors.name'>{{errors.name.message}}</span>
                  </div>
                  <div class="form-group" v-bind:class="{'has-error': errors.abbreviation }">
                     <label for="exampleInputEmail1">Abbreviation*</label>
                     <input type="name" v-model="state.abbreviation" class="form-control" placeholder="Ex: RJ">
                     <span class="help-block" v-if='errors.abbreviation'>{{errors.abbreviation.message}}</span>
                  </div>
               </div>
               <!-- /.col -->
            </div>
            <!-- /.row -->
         </div>
         <!-- /.box-body -->
         <div class="box-footer">
           <button type="submit" v-on:click="updateState()" class="btn btn-primary">Update</button>
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
            state: {},
            errors: {},
        }
    },
    methods: {
        updateState() {
            Api.updateState(this.$route.params.stateId, this.state).then(response => {
                this.$notify({
                    group: 'system',
                    title: `State updated`,
                    text: `The state ${this.state.name} was updated!`
                });
                this.$router.push("/states");
            }).catch(err => {
                console.log(err);
                this.errors = err.response.data;
            })
        },
    },
    beforeMount() {
       Api.getState(this.$route.params.stateId).then(response => {
         this.state = response.data;
       }).catch(err => {
         console.log(err);
         this.$router.push("/states");
       })
    }
}
</script>