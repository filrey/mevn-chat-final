<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form @submit.prevent="onSignin">
            <v-text-field prepend-icon="person" name="login" label="Login Email" id="email" v-model="email" type="email" required></v-text-field>
            <v-text-field id="password" prepend-icon="lock" name="password" label="Password" v-model="password" type="password" required></v-text-field>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Login</v-btn>
              </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

 <script>
   export default {
     data () {
       return {
         email: '',
         password: ''
       }
     },
     computed: {
       user () {
         return this.$store.getters.user
       }
     },
     watch: {
       user (value) {
         if (value !== null && value !== undefined) {
           this.$router.push('/')
         }
       }
     },
     methods: {
       onSignin () {
         this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
       }
     }
   }
 </script>