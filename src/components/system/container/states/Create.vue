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
                   {{ !!(errors && !state.name) }}
                  <div class="form-group" v-bind:class="{'has-error': !!errors.name }">
                     <label for="exampleInputEmail1">Name*</label>
                     <input type="name" v-model="state.name" class="form-control" placeholder="Ex: Rio de Janeiro">
                     <span class="help-block" v-if='errors.name'>{{errors.name.message}}</span>
                  </div>
                  <div class="form-group" v-bind:class="{'has-error': !!errors.abbreviation }">
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
           <button type="submit" v-on:click="createNewState()" class="btn btn-primary">Create</button>
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
        createNewState() {
            Api.createState(this.state).then(response => {
                this.$notify({
                    group: 'system',
                    title: `New State created`,
                    text: `The state ${this.state.name} was created!`
                });
                this.$router.push("/states");
            }).catch(err => {
                console.log(err);
                this.errors = err.response.data.errors;
            })
        },
    },
}
</script>